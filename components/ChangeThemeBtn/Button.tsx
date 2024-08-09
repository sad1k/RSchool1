import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext/ThemeContext";
import React from "react";

const Button = ({ ...props }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      {...props}
      onClick={() => toggleTheme()}
      role="theme-btn"
      className={`${theme ? "lightBtn" : "darkBtn"}`}
    >
      Change Theme
    </button>
  );
};

export default Button;
