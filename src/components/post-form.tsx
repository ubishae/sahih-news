"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

export default function PostForm() {
	const router = useRouter();
	const utils = api.useUtils();
	const { mutate: createPost } = api.post.create.useMutation();

	const form = useForm({
		defaultValues: {
			content: "",
		},
		onSubmit: ({ value }) => {
			createPost(value, {
				onSuccess: () => {
					utils.post.getAll.invalidate();
					toast("Post created successfully", {
						duration: 5000,
					});
					form.reset();
					router.push("/posts");
				},
				onError: () => {
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
				<Button variant="outline">New Post</Button>
			</SheetTrigger>

			<SheetContent side="bottom" className="h-full w-full px-10 py-5">
				<SheetHeader>
					<SheetTitle>Create New Post</SheetTitle>
					<SheetDescription>
						Create a new post and share your thoughts with the world.
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
									<Button variant="outline" disabled={isSubmitting}>
										Cancel
									</Button>
								</div>
								<div className="flex gap-5">
									<Button
										variant="secondary"
										disabled={!canSubmit || isSubmitting}
									>
										{isSubmitting ? (
											<Loader className="h-4 w-4 animate-spin" />
										) : (
											"Save Draft"
										)}
									</Button>
									<SheetTrigger asChild>
										<Button type="submit" disabled={!canSubmit || isSubmitting}>
											{isSubmitting ? (
												<Loader className="h-4 w-4 animate-spin" />
											) : (
												"Publish"
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
