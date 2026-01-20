import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
    Heading1, Heading2, Heading3, List, ListOrdered, Quote,
    Image as ImageIcon, Link as LinkIcon, Table as TableIcon,
    Undo, Redo, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Minus, Maximize2, Minimize2
} from 'lucide-react';
import { useState, useCallback } from 'react';
import './RichTextEditor.css';

const MenuBar = ({ editor }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    if (!editor) return null;

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        if (linkUrl) {
            editor.chain().focus().setLink({ href: linkUrl }).run();
            setLinkUrl('');
            setShowLinkInput(false);
        }
    }, [editor, linkUrl]);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const buttonClass = (isActive) =>
        `p-2 rounded hover:bg-gray-700 transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-300'
        }`;

    return (
        <div className="border-b border-gray-700 p-2 flex flex-wrap gap-1 bg-gray-800 sticky top-0 z-10">
            {/* History */}
            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className={buttonClass(false)}
                    title="Undo"
                >
                    <Undo size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className={buttonClass(false)}
                    title="Redo"
                >
                    <Redo size={18} />
                </button>
            </div>

            {/* Text Formatting */}
            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={buttonClass(editor.isActive('bold'))}
                    title="Bold"
                >
                    <Bold size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={buttonClass(editor.isActive('italic'))}
                    title="Italic"
                >
                    <Italic size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={buttonClass(editor.isActive('underline'))}
                    title="Underline"
                >
                    <UnderlineIcon size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={buttonClass(editor.isActive('strike'))}
                    title="Strikethrough"
                >
                    <Strikethrough size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={buttonClass(editor.isActive('code'))}
                    title="Inline Code"
                >
                    <Code size={18} />
                </button>
            </div>

            {/* Headings */}
            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={buttonClass(editor.isActive('heading', { level: 1 }))}
                    title="Heading 1"
                >
                    <Heading1 size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={buttonClass(editor.isActive('heading', { level: 2 }))}
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={buttonClass(editor.isActive('heading', { level: 3 }))}
                    title="Heading 3"
                >
                    <Heading3 size={18} />
                </button>
            </div>

            {/* Alignment */}
            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={buttonClass(editor.isActive({ textAlign: 'left' }))}
                    title="Align Left"
                >
                    <AlignLeft size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={buttonClass(editor.isActive({ textAlign: 'center' }))}
                    title="Align Center"
                >
                    <AlignCenter size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={buttonClass(editor.isActive({ textAlign: 'right' }))}
                    title="Align Right"
                >
                    <AlignRight size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={buttonClass(editor.isActive({ textAlign: 'justify' }))}
                    title="Justify"
                >
                    <AlignJustify size={18} />
                </button>
            </div>

            {/* Lists */}
            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={buttonClass(editor.isActive('bulletList'))}
                    title="Bullet List"
                >
                    <List size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={buttonClass(editor.isActive('orderedList'))}
                    title="Numbered List"
                >
                    <ListOrdered size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={buttonClass(editor.isActive('blockquote'))}
                    title="Quote"
                >
                    <Quote size={18} />
                </button>
            </div>

            {/* Media & Links */}
            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    onClick={addImage}
                    className={buttonClass(false)}
                    title="Insert Image"
                >
                    <ImageIcon size={18} />
                </button>
                <button
                    onClick={() => setShowLinkInput(!showLinkInput)}
                    className={buttonClass(editor.isActive('link'))}
                    title="Insert Link"
                >
                    <LinkIcon size={18} />
                </button>
                <button
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}
                    className={buttonClass(false)}
                    title="Insert Table"
                >
                    <TableIcon size={18} />
                </button>
            </div>

            {/* Utilities */}
            <div className="flex gap-1">
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className={buttonClass(false)}
                    title="Horizontal Rule"
                >
                    <Minus size={18} />
                </button>
                <button
                    onClick={toggleFullscreen}
                    className={buttonClass(isFullscreen)}
                    title="Toggle Fullscreen"
                >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
            </div>

            {/* Link Input */}
            {showLinkInput && (
                <div className="flex gap-2 items-center w-full mt-2 pt-2 border-t border-gray-700">
                    <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="Enter URL..."
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                setLink();
                            }
                        }}
                    />
                    <button
                        onClick={setLink}
                        className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-white text-sm"
                    >
                        Add Link
                    </button>
                    <button
                        onClick={() => {
                            setShowLinkInput(false);
                            setLinkUrl('');
                        }}
                        className="text-gray-400 hover:text-white text-sm"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

const RichTextEditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // Disable default code block
            }),
            Underline,
            TextStyle,
            Color,
            Image,
            Link.configure({
                openOnClick: false,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4',
            },
        },
    });

    return (
        <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="bg-gray-900" />
        </div>
    );
};

export default RichTextEditor;
