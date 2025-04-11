"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import { Edit, Loader } from "lucide-react";
import { toast } from "sonner";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import type { posts } from "@/server/db/schema";
import { DialogTrigger } from "./ui/dialog";

export default function PostForm({
	post,
}: { post?: typeof posts.$inferSelect }) {
	const utils = api.useUtils();
	const { mutate: createPost, isPending: isCreatingPost } =
		api.post.create.useMutation();
	const { mutate: updatePost, isPending: isUpdatingPost } =
		api.post.update.useMutation();

	const form = useForm({
		defaultValues: {
			content: post?.content ?? "",
		},
		onSubmit: ({ value }) => {
			if (post) {
				updatePost(
					{
						id: post.id,
						content: value.content,
					},
					{
						onSuccess: () => {
							utils.post.getAll.invalidate();
							toast("Post updated successfully", {
								duration: 5000,
							});
							form.reset();
						},
						onError: (e) => {
							console.error(e);
							toast("Failed to update post", {
								duration: 5000,
							});
						},
					},
				);
				return;
			}
			createPost(value, {
				onSuccess: () => {
					utils.post.getAll.invalidate();
					toast("Post created successfully", {
						duration: 5000,
					});
					form.reset();
				},
				onError: (e) => {
					console.error(e);
					toast("Failed to create post", {
						duration: 5000,
					});
				},
			});
		},
	});

	return (
		<Sheet>
			<SheetTrigger asChild>
				{post ? (
					<Edit className="h-4 w-4" />
				) : (
					<Button variant="outline">New Post</Button>
				)}
			</SheetTrigger>

			<SheetContent side="bottom" className="h-full w-full px-10 py-5">
				<SheetHeader>
					<SheetTitle>{post ? "Update Post" : "Create New Post"}</SheetTitle>
					<SheetDescription>
						{post
							? "Update your post"
							: "Create a new post and share your thoughts with the world."}
					</SheetDescription>
				</SheetHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="flex h-full flex-col"
				>
					<div className="grow">
						<form.Field
							name="content"
							children={(field) => (
								<RichTextEditor
									value={field.state.value}
									onChange={(e) => field.handleChange(e)}
								/>
							)}
						/>
					</div>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<div className="mt-5 flex justify-between">
								<div>
									<DialogTrigger>
										<Button
											type="button"
											variant="outline"
											disabled={
												isSubmitting || isUpdatingPost || isCreatingPost
											}
										>
											Cancel
										</Button>
									</DialogTrigger>
								</div>
								<div className="flex gap-5">
									<Button
										type="button"
										variant="secondary"
										disabled={
											!canSubmit ||
											isSubmitting ||
											isUpdatingPost ||
											isCreatingPost
										}
									>
										{isSubmitting ? (
											<Loader className="h-4 w-4 animate-spin" />
										) : (
											"Save Draft"
										)}
									</Button>
									<SheetTrigger asChild>
										<Button
											type="submit"
											disabled={
												!canSubmit ||
												isSubmitting ||
												isUpdatingPost ||
												isCreatingPost
											}
										>
											{isSubmitting ? (
												<Loader className="h-4 w-4 animate-spin" />
											) : (
												<span>{post ? "Update Post" : "Publish"}</span>
											)}
										</Button>
									</SheetTrigger>
								</div>
							</div>
						)}
					/>
				</form>
			</SheetContent>
		</Sheet>
	);
}
