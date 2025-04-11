"use client";

import RichTextPreview from "@/components/rich-text-preview";
import { api } from "@/trpc/react";
import Link from "next/link";

export default function PostsPage() {
	const { data: posts } = api.post.getAll.useQuery();

	return (
		<main>
			<Link href="/posts/new">New Post</Link>
			{posts?.map((post) => (
				<article key={post.id}>
					<RichTextPreview content={post.content} />
				</article>
			))}
		</main>
	);
}
