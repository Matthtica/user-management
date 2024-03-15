"use client";

import {
  EditorContent,
  EditorRoot,
  JSONContent,
  EditorBubble,
} from "novel";
import { NodeSelector } from "./node-selector";
import { LinkSelector } from "./link-selector";
import { TextButtons } from "./text-buttons";
import { ColorSelector } from "./color-selector";
import { handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import React, { useState } from "react";

interface NovelEditorProps extends React.HTMLAttributes<HTMLDivElement> { }
export default function NovelEditor({ className }: NovelEditorProps) {
  const [content, setContent] = useState<JSONContent | undefined>();
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        className={className}
        extensions={[...defaultExtensions]}
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark-prose-invert prose-headings:font-title font-default`
          }
        }}
      >
        <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background">
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <TextButtons />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};
