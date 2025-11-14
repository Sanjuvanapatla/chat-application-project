🧠 Simplified Chat Application (Mini ChatGPT Clone)

A responsive, modern SPA that mimics a basic ChatGPT interface.
Built with React + Tailwind CSS (client) and Node.js + Express (backend).
Supports session management, structured/tabular responses, and light/dark themes.

📌 Features
🖥 Client (React + Tailwind)

Clean two-pane layout (Sidebar + Chat Window)

Light/Dark theme toggle

View past chat sessions in sidebar

Auto-scroll chat window

Beautifully rendered structured (tabular) responses

Responsive mobile-friendly UI

Vite development server with API proxy

⚙ Backend (Node.js + Express)

Fully mock API (no database required)

Auto-generated session IDs

Stores chat history in memory

Returns mock structured JSON responses

Follows REST principles with 4 endpoints:

Method	Route	Description
GET	/api/sessions	List all sessions
GET	/api/new-chat	Create a new session
GET	/api/session/:id	Get conversation history
POST	/api/chat/:id	Send message + get structured reply
🗂 Project Structure
/chat-app-project
│
├── /backend
│   ├── server.js
│   ├── mockData.js
│   ├── package.json
│   └── node_modules/
│
└── /client
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── /src
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── /components
        │     ├── Sidebar.jsx
        │     ├── ChatWindow.jsx
        │     ├── ThemeToggle.jsx
        │     ├── TableResponse.jsx
        │     └── ChatInput.jsx (optional)
        └── node_modules/

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/yourusername/chat-app-project.git
cd chat-app-project

📦 Backend Setup
cd backend
npm install
npm start


Backend runs on:

http://localhost:5000

🎨 Client Setup
cd client
npm install
npm run dev


Client runs on:

http://localhost:5173

🔗 Vite Proxy Setup (Important)

To connect client → backend, your vite.config.js must include:

server: {
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
      secure: false,
    },
  },
},

🛠 Backend Files
mockData.js

Stores sessions in memory

Generates new sessions

Stores user + assistant messages

server.js

Handles all API routes:

/api/sessions

/api/new-chat

/api/session/:id

/api/chat/:id

Includes CORS, JSON parsing, and mock response generation.

🎨 Client Components
📌 Sidebar.jsx

Loads list of sessions

Navigates to selected session

“New Chat” button creates new session

💬 ChatWindow.jsx

Displays full conversation

Sends messages

Receives structured table responses

Auto-scrolls to bottom

🎨 ThemeToggle.jsx

Switch between light / dark mode

Uses tailwind’s dark class mode

📊 TableResponse.jsx

Renders mock structured data in a table

⚠ Requirements

Node.js (16+)

npm or yarn

Basic React + JavaScript knowledge

⭐ Future Enhancements (Optional)

Message typing indicator

Delete session option

Persistent storage (SQLite, MongoDB, etc.)

Like/Dislike feedback buttons

Drag & drop sidebar resizing

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first.

📄 License

This project is licensed under the MIT License.

🎉 Thank You!

This project is a complete working mini-clone of ChatGPT with sessions, theming, structured data, and a clean UI.
