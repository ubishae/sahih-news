import PostForm from "@/components/post-form";
import { SignedIn } from "@clerk/nextjs";

export function PostCreation() {
  return (
    <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 font-semibold text-xl">Share News</h2>
      <SignedIn>
        <PostForm />
      </SignedIn>
    </div>
  );
}
