"use client";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	Bold,
	Italic,
	List,
	ListOrdered,
	Strikethrough,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
} from "lucide-react";
import Alignment from "@tiptap/extension-text-align";

const RichTextEditor = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class:
					"min-h-[150px] max-h-[150px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
			},
		},
		extensions: [
			StarterKit.configure({
				orderedList: {
					HTMLAttributes: {
						class: "list-decimal pl-4",
					},
				},
				bulletList: {
					HTMLAttributes: {
						class: "list-disc pl-4",
					},
				},
			}),
			Alignment.configure({
				types: ["paragraph", "heading"],
				alignments: ["left", "center", "right", "justify"],
				defaultAlignment: "left",
			}),
		],
		content: value, // Set the initial content with the provided value
		onUpdate: ({ editor }) => {
			if (editor.getText() === "") {
				onChange("");
			} else {
				onChange(editor.getHTML());
			}
		},
	});

	return (
		<>
			<EditorContent editor={editor} />
			{editor ? <RichTextEditorToolbar editor={editor} /> : null}
		</>
	);
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
	return (
		<div className="flex flex-row items-center gap-1 rounded-br-md rounded-bl-md border border-input bg-transparent p-1">
			<Toggle
				size="sm"
				pressed={editor.isActive("bold")}
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("italic")}
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("strike")}
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className="h-4 w-4" />
			</Toggle>
			<Separator orientation="vertical" className="h-8 w-[1px]" />
			<Toggle
				size="sm"
				pressed={editor.isActive("bulletList")}
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
			>
				<List className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("orderedList")}
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrdered className="h-4 w-4" />
			</Toggle>
			<Separator orientation="vertical" className="h-8 w-[1px]" />
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "left" })}
				onPressedChange={() =>
					editor.chain().focus().setTextAlign("left").run()
				}
			>
				<AlignLeft className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "center" })}
				onPressedChange={() =>
					editor.chain().focus().setTextAlign("center").run()
				}
			>
				<AlignCenter className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "right" })}
				onPressedChange={() =>
					editor.chain().focus().setTextAlign("right").run()
				}
			>
				<AlignRight className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "justify" })}
				onPressedChange={() =>
					editor.chain().focus().setTextAlign("justify").run()
				}
			>
				<AlignJustify className="h-4 w-4" />
			</Toggle>
		</div>
	);
};

export default RichTextEditor;
