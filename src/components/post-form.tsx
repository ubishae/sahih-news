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
import { useSheets } from "./sheet-manager";
import { GLOBAL_TOAST_DISMISS_TIMEOUT } from "@/lib/constants";

export default function PostForm({
	post,
}: { post?: typeof posts.$inferSelect }) {
	const utils = api.useUtils();
	const { closeAll } = useSheets();
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
							utils.post.all.invalidate();
							toast("Post updated successfully", {
								duration: GLOBAL_TOAST_DISMISS_TIMEOUT,
								onAutoClose: () => {
									closeAll();
								},
							});
							form.reset();
						},
						onError: (e) => {
							console.error(e);
							toast("Failed to update post", {
								duration: GLOBAL_TOAST_DISMISS_TIMEOUT,
								onAutoClose: () => {
									closeAll();
								},
							});
						},
					},
				);
				return;
			}
			createPost(value, {
				onSuccess: () => {
					utils.post.all.invalidate();
					toast("Post created successfully", {
						duration: GLOBAL_TOAST_DISMISS_TIMEOUT,
						onAutoClose: () => {
							closeAll();
						},
					});
					form.reset();
				},
				onError: (e) => {
					console.error(e);
					toast("Failed to create post", {
						duration: GLOBAL_TOAST_DISMISS_TIMEOUT,
						onAutoClose: () => {
							closeAll();
						},
					});
				},
			});
		},
	});

	return (
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
							<Button
								type="button"
								variant="outline"
								disabled={isSubmitting || isUpdatingPost || isCreatingPost}
								onClick={() => closeAll()}
							>
								Cancel
							</Button>
						</div>
						<div className="flex gap-5">
							<Button
								type="button"
								variant="secondary"
								disabled={
									!canSubmit || isSubmitting || isUpdatingPost || isCreatingPost
								}
							>
								{isSubmitting ? (
									<Loader className="h-4 w-4 animate-spin" />
								) : (
									"Save Draft"
								)}
							</Button>
							<Button
								type="submit"
								disabled={
									!canSubmit || isSubmitting || isUpdatingPost || isCreatingPost
								}
							>
								{isSubmitting ? (
									<Loader className="h-4 w-4 animate-spin" />
								) : (
									<span>{post ? "Update Post" : "Publish"}</span>
								)}
							</Button>
						</div>
					</div>
				)}
			/>
		</form>
	);
}
