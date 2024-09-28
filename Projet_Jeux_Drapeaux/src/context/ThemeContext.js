import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('clair');

  // Toggle the theme and update the body class
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'clair' ? 'gris' : 'clair'));
  };

  // Update the body class on theme change
  useEffect(() => {
    document.body.className = theme + '-theme';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
