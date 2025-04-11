import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// Helper function to generate a unique username
const generateUniqueUsername = (
	baseUsername: string | null,
	userId: string,
) => {
	// Create a base username if none provided
	const base = baseUsername || `user_${userId.substring(0, 8)}`;
	// Add a timestamp suffix to ensure uniqueness
	return `${base}_${Date.now().toString().substring(7)}`;
};

export async function POST(req: Request) {
	// Get the webhook signing secret from the environment variables
	// IMPORTANT: Make sure this matches the secret in your Clerk Dashboard
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		console.error("Missing CLERK_WEBHOOK_SECRET env variable");
		return new Response("Missing webhook secret", { status: 500 });
	}

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

	// Get the body as text first to avoid parsing it twice
	const text = await req.text();

	// Create a new Svix instance with the secret
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		// Try to verify the webhook
		evt = wh.verify(text, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);

		// For debugging purposes only
		if (process.env.NODE_ENV === "development") {
			console.warn("⚠️ BYPASSING WEBHOOK VERIFICATION IN DEVELOPMENT MODE ⚠️");
			try {
				evt = JSON.parse(text) as WebhookEvent;
			} catch (parseError) {
				console.error("Failed to parse webhook payload:", parseError);
				return new Response("Error parsing webhook payload", { status: 400 });
			}
		} else {
			// In production, always return error on verification failure
			return new Response("Error verifying webhook", { status: 400 });
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
			// Check if user already exists with this clerkId
			const existingUser = await db
				.select()
				.from(users)
				.where(eq(users.clerkId, id));

			// If user already exists, return success without creating a duplicate
			if (existingUser.length > 0) {
				console.log(
					`User with clerkId ${id} already exists, skipping creation`,
				);
				return NextResponse.json(
					{ success: true, message: "User already exists" },
					{ status: 200 },
				);
			}

			// Generate a unique username
			const uniqueUsername = generateUniqueUsername(username, id);

			// Create a new user in the database
			await db.insert(users).values({
				clerkId: id,
				username: uniqueUsername,
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

				// Generate a unique username for the new user
				const uniqueUsername = generateUniqueUsername(username, id);

				await db.insert(users).values({
					clerkId: id,
					username: uniqueUsername,
					displayName:
						first_name && last_name
							? `${first_name} ${last_name}`
							: first_name || `User ${id.substring(0, 8)}`,
					profileImageUrl: image_url,
					createdAt: new Date(),
				});
			} else {
				// For updates, only change the username if it's provided and different
				let updatedUsername = existingUser[0]?.username;

				if (username && username !== existingUser[0]?.username) {
					// If username is changing, ensure it's unique
					updatedUsername = generateUniqueUsername(username, id);
				}

				// Update existing user
				await db
					.update(users)
					.set({
						username: updatedUsername,
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
