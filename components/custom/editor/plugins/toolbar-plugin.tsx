import { $getSelection, $isRangeSelection } from "lexical";
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import FormatButton from "../common/format-button";
import {
  Superscript,
  Bold,
  Italic,
  Code2,
  Strikethrough,
  Subscript,
  Underline
} from "lucide-react";
import clsx from "clsx";

const iconSize = "1.3em";

interface ToolbarPluginProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function ToolbarPlugin({ className, ...props }: ToolbarPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isSubscript, setIsSubscript] = React.useState(false);
  const [isSuperscript, setIsSuperscript] = React.useState(false);
  const [isCode, setIsCode] = React.useState(false);

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));

      // Update links

      // Handle buttons
    }
  }, [editor]);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  return <div className={clsx("bg-secondary border-b-primary border-1", className)} {...props}>
    <FormatButton value={isBold} format_command="bold">
      <Bold size={iconSize} strokeWidth={isBold ? "3px" : "1px"} />
    </FormatButton>
    <FormatButton value={isItalic} format_command="italic">
      <Italic size={iconSize} strokeWidth={isItalic ? "3px" : "1px"} />
    </FormatButton>
    <FormatButton value={isStrikethrough} format_command="strikethrough">
      <Strikethrough size={iconSize} strokeWidth={isStrikethrough ? "3px" : "1px"} />
    </FormatButton>
    <FormatButton value={isCode} format_command="code">
      <Code2 size={iconSize} strokeWidth={isCode ? "3px" : "1px"} />
    </FormatButton>
    <FormatButton value={isSuperscript} format_command="superscript">
      <Superscript size={iconSize} strokeWidth={isSuperscript ? "3px" : "1px"} />
    </FormatButton>
    <FormatButton value={isSubscript} format_command="subscript">
      <Subscript size={iconSize} strokeWidth={isSubscript ? "3px" : "1px"} />
    </FormatButton>
    <FormatButton value={isUnderline} format_command="underline">
      <Underline size={iconSize} strokeWidth={isUnderline ? "3px" : "1px"} />
    </FormatButton>
  </div>
}
