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
import { Heading, Level } from '@tiptap/extension-heading';

import { Button } from '@/components/ui/button'
import { ChromePicker as ColorPicker, ColorResult } from 'react-color';
import {
  Bold as BoldIc,
  Italic as ItalicIc,
  Underline as UnderlineIc,
  Strikethrough as StrikethroughIc,
  Code as CodeIc,
  Highlighter as HighlighterIc,
  Subscript as SubscriptIc,
  Superscript as SuperscriptIc,
  Palette, Heading1 as H1Ic,
} from 'lucide-react';
import clsx from 'clsx';
import VerticalDivider from '../vertical-divider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { ChangeEvent } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

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

  const changeColor = (color: ColorResult, event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    editor!.chain().focus().setColor(color.hex).run();
  }

  if (!editor) {
    return null
  }
  return (
    <>
      <HeadingMenu />
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        size="icon"
        variant="ghost"
        className={btnClassNames}
      >
        <H1Ic {...iconProps} />
      </Button>
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
        <PopoverTrigger className={clsx({ "opacity-60": !editor.isActive('superscript') }, btnClassNames)}>
          <Palette {...iconProps} />
        </PopoverTrigger>
        <PopoverContent>
          <ColorPicker onChange={changeColor} />
        </PopoverContent>
      </Popover>
      <VerticalDivider />
    </>
  )
}

interface HeadingLevelMap { [key: string]: Level }

function HeadingMenu() {
  const { editor } = useCurrentEditor();
  const [level, setLevel] = React.useState<string>();

  const lookup: HeadingLevelMap = {
    "Heading 1": 1,
    "Heading 2": 2,
    "Heading 3": 3,
    "Heading 4": 4,
    "Heading 5": 5,
    "Heading 6": 6,
  }

  const onChangeLevel = (lev: string) => {
    setLevel(lev)
    console.log(lev);
    editor!.chain().focus().toggleHeading({ level: lookup[lev] })
  }

  return <DropdownMenu>
    <DropdownMenuTrigger>Heading</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuRadioGroup value={level} onValueChange={onChangeLevel}>
        {Object.keys(lookup).map((key) => {
          return <DropdownMenuRadioItem key={key} value={key}>{key}</DropdownMenuRadioItem>;
        })}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
}
