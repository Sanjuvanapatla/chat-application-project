// CommonJS module exporting mock sessions and helpers
const sessions = {
  // sessionId: { id, title, createdAt, messages: [{role:'user'|'assistant', text, structured?}] }
};

// seed one session
const seedId = String(Date.now());
sessions[seedId] = {
  id: seedId,
  title: "Welcome chat",
  createdAt: new Date().toISOString(),
  messages: [
    { role: "assistant", text: "Hi — this is a mock session. Ask me something!" }
  ]
};

function listSessions() {
  return Object.values(sessions).map(s => ({ id: s.id, title: s.title, createdAt: s.createdAt }));
}

function newSession() {
  const id = String(Date.now()) + Math.floor(Math.random() * 1000);
  sessions[id] = {
    id,
    title: `Chat ${Object.keys(sessions).length + 1}`,
    createdAt: new Date().toISOString(),
    messages: [{ role: "assistant", text: "This session was created for you." }]
  };
  return sessions[id];
}

function getSession(id) {
  return sessions[id] || null;
}

function addMessageToSession(id, message) {
  if (!sessions[id]) return null;
  sessions[id].messages.push(message);
  return message;
}

module.exports = { sessions, listSessions, newSession, getSession, addMessageToSession };
