import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
  colors: {
    background: string;
    text: string;
    card: string;
    border: string;
    primary: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('system');

  const isDark =
    theme === 'system' ? systemScheme === 'dark' : theme === 'dark';

  const colors = isDark
    ? {
        background: '#121212',
        text: '#FFFFFF',
        card: '#1E1E1E',
        border: '#333333',
        primary: '#BB86FC',
      }
    : {
        background: '#FFFFFF',
        text: '#000000',
        card: '#F5F5F5',
        border: '#E0E0E0',
        primary: '#6200EE',
      };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, colors }}>
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
