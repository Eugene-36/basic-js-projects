import React, { useContext } from 'react';

const ThemeContext = React.createContext({ mode: 'light' });
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ThemeContext.Provider;
