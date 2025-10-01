'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

// 1. Definimos los tipos de temas que aceptaremos
type Theme = 'light' | 'dark';

// 2. Definimos la "forma" que tendrá nuestro contexto
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 3. Creamos el contexto de React
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 4. Creamos el componente "Proveedor" del tema
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Efecto para LEER el tema inicial del localStorage, se ejecuta UNA SOLA VEZ.
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []); // <-- El array vacío asegura que se ejecute solo al montar el componente

  // Efecto para APLICAR los cambios de tema al DOM y al localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]); // <-- Este efecto se ejecuta solo cuando el estado 'theme' cambia

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5. Hook personalizado para consumir el contexto fácilmente
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
