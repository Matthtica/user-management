import { $getSelection, $isRangeSelection } from "lexical";
import ToolbarContext from "../context/toolbar-context";
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import BoldButton from "../toolbar-plugins/bold-button";
import ItalicButton from "../toolbar-plugins/italic-button";
import StrikeThroughButton from "../toolbar-plugins/strikethrough-button";

export default function ToolbarPlugin() {
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
  }, [editor]);

  return <ToolbarContext.Provider
    value={{
      isBold,
      isItalic,
      isUnderline,
      isCode,
      isStrikethrough,
      isSubscript,
      isSuperscript
    }}
  >
    <BoldButton />
    <ItalicButton />
    <StrikeThroughButton />
  </ToolbarContext.Provider>
}
