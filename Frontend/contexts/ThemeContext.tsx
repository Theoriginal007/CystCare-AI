
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    textSecondary: string;
    border: string;
    card: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');
  
  const isDark = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';

  const colors = isDark ? {
    background: '#2D1B2E', // Dark purple background
    surface: '#3D2A3E', // Slightly lighter purple
    primary: '#F4D3E5', // Light pink as primary in dark mode
    secondary: '#D1A3C9', // Muted pink
    text: '#F4D3E5', // Light pink text
    textSecondary: '#D1A3C9', // Muted pink for secondary text
    border: '#A3327A', // Deep magenta borders
    card: '#3D2A3E' // Card background
  } : {
    background: '#F4D3E5', // Light pink background
    surface: '#F9E8F2', // Very light pink surface
    primary: '#A3327A', // Deep magenta as primary
    secondary: '#B85A92', // Medium magenta
    text: '#A3327A', // Deep magenta text
    textSecondary: '#B85A92', // Medium magenta for secondary text
    border: '#D1A3C9', // Light magenta borders
    card: '#FFFFFF' // White cards for contrast
  };

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setThemeState(savedTheme as Theme);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
