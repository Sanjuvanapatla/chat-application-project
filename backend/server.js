const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { listSessions, newSession, getSession, addMessageToSession } = require("./mockData");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// GET /api/sessions  -> list sessions
app.get("/api/sessions", (req, res) => {
  res.json({ success: true, sessions: listSessions() });
});

// GET /api/new-chat -> create new session and return id
app.get("/api/new-chat", (req, res) => {
  const s = newSession();
  res.json({ success: true, session: { id: s.id, title: s.title, createdAt: s.createdAt } });
});

// GET /api/session/:id -> full conversation history
app.get("/api/session/:id", (req, res) => {
  const id = req.params.id;
  const session = getSession(id);
  if (!session) return res.status(404).json({ success: false, error: "Session not found" });
  res.json({ success: true, session });
});

// POST /api/chat/:id -> accepts { question } and returns mocked structured response
app.post("/api/chat/:id", (req, res) => {
  const id = req.params.id;
  const { question } = req.body;
  const session = getSession(id);
  if (!session) return res.status(404).json({ success: false, error: "Session not found" });

  // Save user message
  addMessageToSession(id, { role: "user", text: question });

  // MOCK: create structured (tabular) response
  // For demo, return a short descriptive text + array-of-objects table
  const descriptive = `Mock answer for: "${question}"`;
  const structured = [
    { name: "Alice", score: 92, passed: true },
    { name: "Bob", score: 78, passed: true },
    { name: "Charlie", score: 58, passed: false }
  ];

  const assistantMessage = {
    role: "assistant",
    text: descriptive,
    structured // optional field to hold tabular data
  };

  addMessageToSession(id, assistantMessage);

  // Return the assistant response
  res.json({ success: true, response: assistantMessage });
});

app.listen(PORT, () => {
  console.log(`Mock API server listening on http://localhost:${PORT}`);
});
