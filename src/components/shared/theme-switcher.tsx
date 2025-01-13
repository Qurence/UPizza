"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '../ui';
import { Moon, Sun } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Применяем сохранённую тему при монтировании
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    const isDark = storedTheme === 'dark';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button variant="outline" onClick={toggleTheme} className="flex items-center gap-1">
      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
      {/* {isDarkMode ? 'Светлая' : 'Тёмная'} */}
    </Button>
  );
};

export { ThemeSwitcher };
