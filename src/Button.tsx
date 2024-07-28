import "./App.css";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext/ThemeContext";

const Button = ({ ...props }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      {...props}
      onClick={() => toggleTheme()}
      className={`${theme ? "lightBtn" : "darkBtn"}`}
    >
      Change Theme
    </button>
  );
};

export default Button;
