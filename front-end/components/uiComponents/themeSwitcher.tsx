import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div onClick={toggleTheme} style={{ cursor: "pointer", fontSize: "24px" }}>
      {theme === "light" ? (
        <FontAwesomeIcon icon={faSun}/>
      ) : (
        <FontAwesomeIcon icon={faMoon}/>
      )}
    </div>
  );
};

export default ThemeSwitcher;
