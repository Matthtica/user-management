import EditorContext from './context/editor-context';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface IEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function Editor({ children, className }: IEditorProps) {
  const [editor] = useLexicalComposerContext();

  return (
    <EditorContext.Provider
      value={{ editor }}
    >
      {children}
      <RichTextPlugin
        contentEditable={<ContentEditable className={className} />}
        placeholder={<div>placeholder...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </EditorContext.Provider>
  );
};
