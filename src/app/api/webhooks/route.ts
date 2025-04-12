import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// Types for Clerk webhook data
type UserData = {
	id: string;
	email_addresses: Array<{ email_address: string }>;
	username: string | null;
	first_name: string | null;
	last_name: string | null;
	image_url: string;
};

// Helper function to generate a unique username
const generateUniqueUsername = (
	baseUsername: string | null,
	userId: string,
): string => {
	// Create a base username if none provided
	const base = baseUsername || `user_${userId.substring(0, 8)}`;
	// Add a timestamp suffix to ensure uniqueness
	return `${base}_${Date.now().toString().substring(7)}`;
};

// Helper function to verify webhook signature
const verifyWebhook = async (req: Request): Promise<WebhookEvent | null> => {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		console.error("Missing CLERK_WEBHOOK_SECRET env variable");
		throw new Error("Server configuration error");
	}

	// Get the headers
	const svix_id = req.headers.get("svix-id");
	const svix_timestamp = req.headers.get("svix-timestamp");
	const svix_signature = req.headers.get("svix-signature");

	// Validate headers
	if (!svix_id || !svix_timestamp || !svix_signature) {
		console.error("Missing svix headers", {
			svix_id,
			svix_timestamp,
			svix_signature,
		});
		throw new Error("Invalid webhook request");
	}

	// Get the body as text
	const text = await req.text();

	// Create a new Svix instance with the secret
	const wh = new Webhook(WEBHOOK_SECRET);

	try {
		// Verify the webhook
		return wh.verify(text, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);

		// Only bypass verification in development
		if (process.env.NODE_ENV === "development") {
			console.warn("⚠️ BYPASSING WEBHOOK VERIFICATION IN DEVELOPMENT MODE ⚠️");
			try {
				return JSON.parse(text) as WebhookEvent;
			} catch (parseError) {
				console.error("Failed to parse webhook payload:", parseError);
				return null;
			}
		}

		return null;
	}
};

// Helper function to check if user exists
const getUserByClerkId = async (clerkId: string) => {
	return await db.select().from(users).where(eq(users.clerkId, clerkId));
};

// Handler for user.created event
const handleUserCreated = async (userData: UserData) => {
	const { id, email_addresses, username, first_name, last_name, image_url } =
		userData;

	// Extract the primary email
	const primaryEmail = email_addresses[0]?.email_address;

	if (!primaryEmail) {
		throw new Error("No email found for user");
	}

	// Check if user already exists with this clerkId
	const existingUser = await getUserByClerkId(id);

	// If user already exists, return success without creating a duplicate
	if (existingUser.length > 0) {
		console.log(`User with clerkId ${id} already exists, skipping creation`);
		return { success: true, message: "User already exists", status: 200 };
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
		updatedAt: new Date(),
	});

	return { success: true, message: "User created", status: 201 };
};

// Handler for user.updated event
const handleUserUpdated = async (userData: UserData) => {
	const { id, username, first_name, last_name, image_url } = userData;

	// Check if user exists
	const existingUser = await getUserByClerkId(id);

	// If user doesn't exist, we should NOT create a new one on update
	// This prevents the duplicate user issue
	if (existingUser.length === 0) {
		console.warn(`User with clerkId ${id} not found during update, skipping`);
		return { success: false, message: "User not found", status: 404 };
	}

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

	return { success: true, message: "User updated", status: 200 };
};

// Handler for user.deleted event
const handleUserDeleted = async (userData: { id: string }) => {
	const { id } = userData;

	if (!id) {
		throw new Error("No user ID provided");
	}

	// Delete the user from the database
	await db.delete(users).where(eq(users.clerkId, id));

	return { success: true, message: "User deleted", status: 200 };
};

// Main webhook handler
export async function POST(req: Request) {
	try {
		// Verify the webhook
		const evt = await verifyWebhook(req);

		if (!evt) {
			return NextResponse.json(
				{ success: false, error: "Invalid webhook" },
				{ status: 400 },
			);
		}

		// Handle the webhook event
		const eventType = evt.type;
		console.log("Processing webhook event:", eventType);

		// Define the type based on the return type of the handler functions
		let result: { success: boolean; message: string; status: number };

		switch (eventType) {
			case "user.created":
				result = await handleUserCreated(evt.data as UserData);
				break;
			case "user.updated":
				result = await handleUserUpdated(evt.data as UserData);
				break;
			case "user.deleted":
				result = await handleUserDeleted(evt.data as { id: string });
				break;
			default:
				// Return a 200 response for other event types
				result = { success: true, message: "Webhook received", status: 200 };
		}

		return NextResponse.json(
			{ success: result.success, message: result.message },
			{ status: result.status },
		);
	} catch (error) {
		console.error("Error processing webhook:", error);
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}
