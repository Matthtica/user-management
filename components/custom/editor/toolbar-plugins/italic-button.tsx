import ToolbarContext from "../context/toolbar-context";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import clsx from "clsx";

export default function BoldButton() {
  const { isItalic } = useContext(ToolbarContext)!;
  const [editor] = useLexicalComposerContext();

  const makeBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  }

  return <Button
    onClick={makeBold}
    variant="ghost"
    className={clsx({ "opacity-60": !isItalic }, "italic")}
  >
    I
  </Button>
}
