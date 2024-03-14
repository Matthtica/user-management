import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Highlight } from '@tiptap/extension-highlight';

import { Button } from '../ui/button'
import {
  Bold as BoldIc,
  Italic as ItalicIc,
  Underline as UnderlineIc,
  Strikethrough as StrikethroughIc,
  Code as CodeIc,
  Highlighter as HighlighterIc
} from 'lucide-react';
import clsx from 'clsx';

// define your extension array
const extensions = [
  StarterKit, Underline, Highlight
]

const content = '<p>Hello World!</p>'

interface TiptapProps extends React.HTMLAttributes<HTMLDivElement> { }
export default function Tiptap({ className }: TiptapProps) {
  const menuClassNames = "rounded-md border-secondary border shadow-md p-1 bg-background";
  return <div className={className}>
    <EditorProvider extensions={extensions} content={content}>
      <FloatingMenu className={menuClassNames}><MenuBar /></FloatingMenu>
      <BubbleMenu className={menuClassNames}>
        <MenuBar />
      </BubbleMenu>
    </EditorProvider>
  </div>
}

const iconProps = {
  size: "1.2em",
  strokeWidth: "2px"
}
function MenuBar() {
  const { editor } = useCurrentEditor();
  const btnClassNames = "h-8 aspect-square"

  if (!editor) {
    return null
  }
  return (
    <>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        size="icon"
        variant="ghost"
        className={clsx({ "opacity-60": !editor.isActive('bold') }, btnClassNames)}
      >
        <BoldIc {...iconProps} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        size="icon"
        variant="ghost"
        className={clsx({ "opacity-60": !editor.isActive('italic') }, btnClassNames)}
      >
        <ItalicIc {...iconProps} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        size="icon"
        variant="ghost"
        className={clsx({ "opacity-60": !editor.isActive('underline') }, btnClassNames)}
      >
        <UnderlineIc {...iconProps} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        size="icon"
        variant="ghost"
        className={clsx({ "opacity-60": !editor.isActive('strike') }, btnClassNames)}
      >
        <StrikethroughIc {...iconProps} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        size="icon"
        variant="ghost"
        className={clsx({ "opacity-60": !editor.isActive('code') }, btnClassNames)}
      >
        <CodeIc {...iconProps} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        size="icon"
        variant="ghost"
        className={clsx({ "opacity-60": !editor.isActive('highlight') }, btnClassNames)}
      >
        <HighlighterIc {...iconProps} />
      </Button>
    </>
  )
}
