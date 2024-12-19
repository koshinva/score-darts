import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../model/theme.context';
import { getInitialTheme, setThemeHTML, setThemeStorage } from '@/shared/helpers/theme';

const ThemeProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [theme, setTheme] = useState(() => getInitialTheme());

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setThemeStorage(newTheme);
  }, [theme]);

  useEffect(() => {
    setThemeHTML(theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
