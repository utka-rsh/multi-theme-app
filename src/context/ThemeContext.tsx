import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'theme1' | 'theme2' | 'theme3';

interface ThemeContextType {
  themeName: Theme;
  setThemeName: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'app-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeNameState] = useState<Theme>('theme1');

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (storedTheme) {
      setThemeNameState(storedTheme);
      document.body.classList.add(storedTheme);
    } else {
      document.body.classList.add('theme1');
    }
  }, []);

  // Update DOM and localStorage on theme change
  const setThemeName = (newTheme: Theme) => {
    document.body.classList.remove(themeName);
    document.body.classList.add(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    setThemeNameState(newTheme);
  };


//   useEffect(() => {
//   const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
//   const root = document.documentElement; // <html> element

//   if (storedTheme) {
//     setThemeNameState(storedTheme);
//     root.classList.add(storedTheme);
//   } else {
//     root.classList.add('theme1');
//   }
// }, []);

// const setThemeName = (newTheme: Theme) => {
//   const root = document.documentElement;

//   root.classList.remove(themeName);
//   root.classList.add(newTheme);
//   localStorage.setItem(THEME_KEY, newTheme);
//   setThemeNameState(newTheme);
// };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

