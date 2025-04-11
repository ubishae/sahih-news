"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewPostPage() {
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
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="content"
				children={(field) => (
					<RichTextEditor
						value={field.state.value}
						onChange={(e) => field.handleChange(e)}
					/>
				)}
			/>

			<div className="mt-5 flex justify-between">
				<div>
					<Button variant="outline">Cancel</Button>
				</div>
				<div className="flex gap-5">
					<Button variant="secondary">Save Draft</Button>
					<Button type="submit">Publish</Button>
				</div>
			</div>
		</form>
	);
}
