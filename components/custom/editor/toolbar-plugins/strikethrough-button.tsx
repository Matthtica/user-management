import { Button } from "@/components/ui/button";
import ToolbarContext from "../context/toolbar-context";
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from 'lexical';
import clsx from "clsx";

export default function StrikeThroughButton() {
  const { isStrikethrough } = React.useContext(ToolbarContext)!;
  const [editor] = useLexicalComposerContext();

  const makeStrikethrough = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
  }

  return <Button
    onClick={makeStrikethrough}
    variant="ghost"
    className={clsx("line-through", { "opacity-60": !isStrikethrough })}
  >
    S
  </Button>
}
