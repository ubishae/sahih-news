import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextPreview({ content }: { content: string }) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: content.startsWith("<p>") ? content : `<p>${content}</p>`,
		editable: false,
	});

	return editor ? <EditorContent editor={editor} /> : null;
}
