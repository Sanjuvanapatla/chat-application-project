import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1 border rounded"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
