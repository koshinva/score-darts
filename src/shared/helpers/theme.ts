import { schemaTheme, TypeTheme } from '../types/theme';

export const getInitialTheme = () => {
  const value = localStorage.getItem('theme');

  const parse = schemaTheme.safeParse(value);

  if (parse.success) return parse.data;

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';

  return 'light';
};

export const setThemeStorage = (theme: TypeTheme) => {
  localStorage.setItem('theme', JSON.stringify(theme));
};

export const setThemeHTML = (theme: TypeTheme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
