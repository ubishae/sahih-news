import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({
		image: {
			/**
			 * For full list of options and defaults, see the File Route API reference
			 * @see https://docs.uploadthing.com/file-routes#route-config
			 */
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const authResult = await auth();
			const userId = authResult.userId;

			// If you throw, the user will not be able to upload
			if (!userId) throw new UploadThingError("Unauthorized");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for userId:", metadata.userId);

			console.log("file url", file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId, url: file.url };
		}),
	
	// Add a profile image uploader with different settings
	profileImage: f({
		image: {
			maxFileSize: "2MB",
			maxFileCount: 1,
		},
	})
		.middleware(async ({ req }) => {
			const authResult = await auth();
			const userId = authResult.userId;
			
			if (!userId) throw new UploadThingError("Unauthorized");
			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Profile image upload complete for userId:", metadata.userId);
			return { uploadedBy: metadata.userId, url: file.url };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
