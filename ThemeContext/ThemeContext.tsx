import { createContext, ReactNode, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ theme: isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
