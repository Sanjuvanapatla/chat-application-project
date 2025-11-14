import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [sessions, setSessions] = useState([]);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    fetch("/api/sessions").then(r => r.json()).then(data => {
      if (data.success) setSessions(data.sessions);
    }).catch(console.error);
  }, []);

  const handleNew = async () => {
    const res = await fetch("/api/new-chat");
    const data = await res.json();
    if (data.success) {
      nav(`/chat/${data.session.id}`);
    }
  }; 

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 h-screen p-4 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Chats</h2>
        <button className="px-2 py-1 rounded bg-blue-500 text-white" onClick={handleNew}>New</button>
      </div>
      <div>
        {sessions.map(s => (
          <Link key={s.id} to={`/chat/${s.id}`}>
            <div className={`p-2 rounded mb-2 cursor-pointer ${loc.pathname === `/chat/${s.id}` ? "bg-blue-100 dark:bg-blue-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-300">{new Date(s.createdAt).toLocaleString()}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
