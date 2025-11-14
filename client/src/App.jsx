import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <div className="flex justify-end mb-2">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
            <Routes>
              <Route
  path="/"
  element={
    <div className="p-8 flex items-center justify-center h-full">
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow text-gray-700 dark:text-gray-200 text-lg">
        Select or create a chat from the left.
      </div>
    </div>
  }
/>
              <Route path="/chat/:sessionId" element={<ChatWindow />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
