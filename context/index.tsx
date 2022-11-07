import { createContext } from 'react';
import { ErrorType } from '@components/ErrorPrompt';

export const ErrorContext = createContext<
  (type: ErrorType, text: string) => void
>(() => {});
