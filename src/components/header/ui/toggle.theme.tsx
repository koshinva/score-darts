import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/providers/theme';
import { MoonIcon, SunIcon } from 'lucide-react';

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Button size="icon" variant="outline" onClick={toggleTheme}>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
