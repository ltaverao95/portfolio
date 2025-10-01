'use client';

import { useTheme } from '@/context/theme-context';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
