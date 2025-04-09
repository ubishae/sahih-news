import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
	// Get the webhook signing secret from the environment variables
	const WEBHOOK_SECRET = process.env.SIGNING_SECRET;

	if (!WEBHOOK_SECRET) {
		console.error("Missing SIGNING_SECRET env variable");
		return new Response("Missing webhook secret", { status: 500 });
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = (await headerPayload).get("svix-id");
	const svix_timestamp = (await headerPayload).get("svix-timestamp");
	const svix_signature = (await headerPayload).get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Missing svix headers", { status: 400 });
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with the secret
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}

	// Handle the webhook event
	const eventType = evt.type;

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
				id: id, // Clerk user ID
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
				.where(eq(users.id, id));

			if (existingUser.length === 0) {
				// User doesn't exist, create a new one
				const primaryEmail = email_addresses[0]?.email_address;

				if (!primaryEmail) {
					return new Response("No email found for user", { status: 400 });
				}

				await db.insert(users).values({
					id: id,
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
					.where(eq(users.id, id));
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
			await db.delete(users).where(eq(users.id, id));

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
