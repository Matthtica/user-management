import { LexicalEditor } from "lexical";
import Editor from "./editor";
import {
  LexicalComposer,
  InitialEditorStateType,
  InitialConfigType,
} from '@lexical/react/LexicalComposer';
import React from 'react';
import ToolbarPlugin from "./plugins/toolbar-plugin";
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode } from "@lexical/link";

interface IEditorComposer extends React.HTMLAttributes<HTMLDivElement> {
  initialEditorState?: InitialEditorStateType;
}

const EditorComposer = ({ children, className, initialEditorState }: IEditorComposer) => {
  const initialConfig: InitialConfigType = {
    editorState: initialEditorState,
    namespace: 'shadcn-rteditor',
    nodes: [
      ListNode,
      ListItemNode,
      LinkNode
    ],
    onError: (error: Error) => {
      throw error;
    },
    theme: {
      text: {
        bold: 'rt-text-bold',
        code: 'rt-text-code',
        italic: 'rt-text-italic',
        strikethrough: 'rt-text-strikethrough',
        subscript: 'rt-text-subscript',
        superscript: 'rt-text-superscript',
        underline: 'rt-text-underline',
        underlineStrikethrough: 'rt-text-underline-strikethrough'
      },
      code: 'rt-code',
    },
  };

  return <div className={className}>
    <LexicalComposer initialConfig={initialConfig}>
      {children}
    </LexicalComposer>
  </div>
};

interface RTEditorProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function RTEditor({ className }: RTEditorProps) {
  return <EditorComposer className={className}>
    <Editor className="p-3">
      <ToolbarPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <LinkPlugin />
      <AutoFocusPlugin />
      <ClearEditorPlugin />
    </Editor>
  </EditorComposer>
}
