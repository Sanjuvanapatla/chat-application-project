import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import TableResponse from "./TableResponse";
import { API_BASE } from "../config";

export default function ChatWindow() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [input, setInput] = useState("");
  const listRef = useRef();

  useEffect(() => {
    if (!sessionId) return;
    fetch(`${API_BASE}/api/session/${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setSession(data.session);
      })
      .catch(console.error);
  }, [sessionId]);

  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [session]);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!input.trim()) return;
    const res = await fetch(`${API_BASE}/api/chat/${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input.trim() }),
    });
    const data = await res.json();
    if (data.success) {
      // refresh session
      const refreshed = await fetch(
        `${API_BASE}/api/session/${sessionId}`
      ).then((r) => r.json());

      if (refreshed.success) setSession(refreshed.session);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[85vh]">
      <div className="border rounded p-3 mb-3 bg-white dark:bg-gray-800">
        <div className="font-semibold">{session?.title || "Loading..."}</div>
        <div className="text-xs text-gray-500 dark:text-gray-300">
          {session?.createdAt
            ? new Date(session.createdAt).toLocaleString()
            : ""}
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-auto p-2 space-y-3">
        {session?.messages?.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded max-w-[80%] ${
              m.role === "user"
                ? "bg-blue-600 text-white self-end rounded-br-none"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
            }`}
          >
            <div className="whitespace-pre-wrap">{m.text}</div>

            {m.structured && (
              <div className="mt-2">
                <TableResponse data={m.structured} />
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          className="
    flex-1 p-2 rounded border focus:outline-none
    bg-white text-black placeholder-gray-500      /* Light theme */
    dark:bg-gray-600 dark:text-white dark:placeholder-blue-200  /* Dark theme */
  "
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />

        <button type="submit" className="px-4 rounded bg-green-500 text-white">
          Send
        </button>
      </form>
    </div>
  );
}
