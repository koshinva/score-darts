import { TypeTheme } from '@/shared/types/theme';
import { createContext } from 'react';

export type ThemeContextType = {
  theme: TypeTheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
