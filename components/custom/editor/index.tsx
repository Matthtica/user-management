import { LexicalEditor } from "lexical";
import Editor from "./editor";
import {
  LexicalComposer,
  InitialEditorStateType,
} from '@lexical/react/LexicalComposer';
import React from 'react';
import PlaygroundNodes from '../playground/nodes/PlaygroundNodes';
import PlaygroundEditorTheme from '../playground/themes/PlaygroundEditorTheme';
import ToolbarPlugin from "./plugins/toolbar-plugin";
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

interface IEditorComposer extends React.HTMLAttributes<HTMLDivElement> {
  initialEditorState?: InitialEditorStateType;
}

const EditorComposer = ({ children, className, initialEditorState }: IEditorComposer) => {
  const initialConfig = {
    editorState: initialEditorState,
    namespace: 'shadcn-rteditor',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
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
