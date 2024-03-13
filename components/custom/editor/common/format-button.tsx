import React from "react";
import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import clsx from "clsx";

interface FormatButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: boolean,
  format_command: "bold" | "strikethrough" | "italic" | "underline" | "code" | "highlight" | "subscript" | "superscript",
}

export default function FormatButton({ children, value, format_command }: FormatButtonProps) {
  const [editor] = useLexicalComposerContext();

  const formatText = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format_command);
  }

  return <Button
    onClick={formatText}
    variant="ghost"
    size="icon"
    className={clsx({ "opacity-60": !value }, "font-bold")}
  >
    {children}
  </Button>
}
