import { LexicalEditor } from 'lexical';
import { createContext } from 'react';

interface IEditorContext {
  editor: LexicalEditor,
}

const EditorContext = createContext<IEditorContext | null>(null);

export default EditorContext;
