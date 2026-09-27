import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function () {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-selector pointer">
      <i
        className={`ms-2 bi bi-moon-stars${theme == "dark" ? "-fill text-white" : ""}`}
        onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      ></i>
    </div>
  );
}
