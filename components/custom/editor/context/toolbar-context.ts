import { createContext } from 'react';

interface IToolbarContext {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isCode: boolean;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
}

const ToolbarContext = createContext<IToolbarContext | null>(null);

export default ToolbarContext;
