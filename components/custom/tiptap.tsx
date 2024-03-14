import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';

import { Button } from '../ui/button'
import { HuePicker as ColorPicker } from 'react-color';
import {
  Bold as BoldIc,
  Italic as ItalicIc,
  Underline as UnderlineIc,
  Strikethrough as StrikethroughIc,
  Code as CodeIc,
  Highlighter as HighlighterIc,
  Subscript as SubscriptIc,
  Superscript as SuperscriptIc,
  Palette
} from 'lucide-react';
import clsx from 'clsx';
import VerticalDivider from './vertical-divider';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

// define your extension array
const extensions = [
  StarterKit, Underline, Highlight,
  Subscript, Superscript, TextStyle,
  Color
]

const content = '<p>Hello World!</p>'

interface TiptapProps extends React.HTMLAttributes<HTMLDivElement> { }
export default function Tiptap({ className }: TiptapProps) {
  const menuClassNames = "flex items-center rounded-md border-secondary border shadow-md p-1 bg-background";
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
      <VerticalDivider />
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
      <Button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        disabled={!editor.can().chain().focus().toggleSubscript().run()}
        size="icon"
        variant="ghost"
        className={clsx({ "opacity-60": !editor.isActive('subscript') }, btnClassNames)}
      >
        <SubscriptIc {...iconProps} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        disabled={!editor.can().chain().focus().toggleSuperscript().run()}
        size="icon"
        variant="ghost"
        className={clsx({ "opacity-60": !editor.isActive('superscript') }, btnClassNames)}
      >
        <SuperscriptIc {...iconProps} />
      </Button>
      <Popover>
        <PopoverTrigger><Palette {...iconProps} /></PopoverTrigger>
        <PopoverContent>
          <ColorPicker onChange={(color, _) => editor.chain().focus().setColor(color.hex).run()} />
        </PopoverContent>
      </Popover>
      <VerticalDivider />
    </>
  )
}
