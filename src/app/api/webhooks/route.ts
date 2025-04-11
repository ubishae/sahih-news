import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
	// Get the webhook signing secret from the environment variables
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		console.error("Missing CLERK_WEBHOOK_SECRET env variable");
		return new Response("Missing webhook secret", { status: 500 });
	}

	// Log the secret length for debugging (remove in production)
	console.log("Webhook secret length:", WEBHOOK_SECRET.length);

	// Get the headers directly from the request
	const svix_id = req.headers.get("svix-id");
	const svix_timestamp = req.headers.get("svix-timestamp");
	const svix_signature = req.headers.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		console.error("Missing svix headers:", {
			svix_id,
			svix_timestamp,
			svix_signature,
		});
		return new Response("Missing svix headers", { status: 400 });
	}

	// Log the headers for debugging (remove in production)
	console.log("Webhook headers:", { svix_id, svix_timestamp, svix_signature });

	// Get the body as text first to avoid parsing it twice
	const text = await req.text();

	// Create a new Svix instance with the secret
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		// Log more details about the verification attempt
		console.log("Attempting to verify webhook with:");
		console.log("- svix-id:", svix_id);
		console.log("- svix-timestamp:", svix_timestamp);
		console.log("- svix-signature length:", svix_signature?.length);
		console.log("- payload length:", text.length);

		// Try to verify the webhook
		evt = wh.verify(text, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		console.error(`Webhook payload: ${text.substring(0, 200)}...`);
		console.error(
			`Webhook secret used: ${WEBHOOK_SECRET.substring(0, 3)}...${WEBHOOK_SECRET.substring(WEBHOOK_SECRET.length - 3)}`,
		);

		// For debugging purposes, let's try to parse the payload anyway
		try {
			const payload = JSON.parse(text);
			console.log("Webhook event type (unverified):", payload.type);

			// TEMPORARY WORKAROUND: Skip verification in development
			// WARNING: Remove this in production!
			if (process.env.NODE_ENV === "development") {
				console.warn("⚠️ BYPASSING WEBHOOK VERIFICATION IN DEVELOPMENT MODE ⚠️");
				evt = payload as WebhookEvent;
			} else {
				return new Response("Error verifying webhook", { status: 400 });
			}
		} catch (parseError) {
			console.error("Failed to parse webhook payload:", parseError);
			return new Response("Error parsing webhook payload", { status: 400 });
		}
	}

	if (!evt) {
		return new Response("No event data", { status: 400 });
	}

	// Handle the webhook event
	const eventType = evt.type;
	console.log("Processing webhook event:", eventType);

	if (eventType === "user.created") {
		const { id, email_addresses, username, first_name, last_name, image_url } =
			evt.data;

		// Extract the primary email
		const primaryEmail = email_addresses[0]?.email_address;

		if (!primaryEmail) {
			return new Response("No email found for user", { status: 400 });
		}

		try {
			// Create a new user in the database
			await db.insert(users).values({
				clerkId: id,
				username: username || `user_${id.substring(0, 8)}`, // Use username or generate one
				displayName:
					first_name && last_name
						? `${first_name} ${last_name}`
						: first_name || `User ${id.substring(0, 8)}`,
				profileImageUrl: image_url,
				createdAt: new Date(),
			});

			return NextResponse.json(
				{ success: true, message: "User created" },
				{ status: 201 },
			);
		} catch (error) {
			console.error("Error creating user:", error);
			return NextResponse.json(
				{ success: false, error: "Failed to create user" },
				{ status: 500 },
			);
		}
	}

	if (eventType === "user.updated") {
		const { id, email_addresses, username, first_name, last_name, image_url } =
			evt.data;

		try {
			// Check if user exists
			const existingUser = await db
				.select()
				.from(users)
				.where(eq(users.clerkId, id));

			if (existingUser.length === 0) {
				// User doesn't exist, create a new one
				const primaryEmail = email_addresses[0]?.email_address;

				if (!primaryEmail) {
					return new Response("No email found for user", { status: 400 });
				}

				await db.insert(users).values({
					clerkId: id,
					username: username || `user_${id.substring(0, 8)}`,
					displayName:
						first_name && last_name
							? `${first_name} ${last_name}`
							: first_name || `User ${id.substring(0, 8)}`,
					profileImageUrl: image_url,
					createdAt: new Date(),
				});
			} else {
				// Update existing user
				await db
					.update(users)
					.set({
						username: username || existingUser[0]?.username,
						displayName:
							first_name && last_name
								? `${first_name} ${last_name}`
								: first_name || existingUser[0]?.displayName,
						profileImageUrl: image_url || existingUser[0]?.profileImageUrl,
						updatedAt: new Date(),
					})
					.where(eq(users.clerkId, id));
			}

			return NextResponse.json(
				{ success: true, message: "User updated" },
				{ status: 200 },
			);
		} catch (error) {
			console.error("Error updating user:", error);
			return NextResponse.json(
				{ success: false, error: "Failed to update user" },
				{ status: 500 },
			);
		}
	}

	if (eventType === "user.deleted") {
		const { id } = evt.data;

		try {
			// Delete the user from the database
			if (!id) {
				return new Response("No user ID provided", { status: 400 });
			}
			await db.delete(users).where(eq(users.clerkId, id));

			return NextResponse.json(
				{ success: true, message: "User deleted" },
				{ status: 200 },
			);
		} catch (error) {
			console.error("Error deleting user:", error);
			return NextResponse.json(
				{ success: false, error: "Failed to delete user" },
				{ status: 500 },
			);
		}
	}

	// Return a 200 response for other event types
	return NextResponse.json(
		{ success: true, message: "Webhook received" },
		{ status: 200 },
	);
}
