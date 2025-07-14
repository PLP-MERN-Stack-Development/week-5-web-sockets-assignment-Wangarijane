[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19904667&assignment_repo_type=AssignmentRepo)
# 🔌 Real-Time Chat App

A feature-rich real-time chat application built with the MERN stack and Socket.io. This app allows users to chat publicly or privately, share files and images, react to messages, get typing indicators, and enjoy real-time notifications—all in a responsive interface.

---

## 🚀 Features

### ✅ Core Features
- User authentication (username via local storage)
- Public and private messaging
- Real-time communication via Socket.io
- Typing indicators
- Message timestamps

### 💬 Advanced Chat Features
- Message reactions (👍 ❤️ 😂)
- Private messaging
- Multiple chat rooms (General, Tech, Random)
- File/image sharing (via upload input)
- Read receipts (✓ Seen)
- Message pagination (for older messages)

### 🔔 Real-Time Notifications
- Sound notifications for new messages
- Browser push notifications (Web Notification API)
- Unread message count in page title
- Reconnection notifications and logic
- Join/leave alerts for users

### ⚙️ Performance and UX
- Reconnection logic for dropped connections
- Read receipts with live updates
- Typing indicator for active users
- Fully responsive design for desktop and mobile

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Real-Time**: Socket.io
- **State Handling**: React Hooks + Custom Socket Hook
- **Other Tools**: date-fns, browser notifications, HTML5 audio

---

## 📂 Project Structure


```
client/
├── public/
│ ├── notification.mp3
│ ├── icon.png
├── src/
│ ├── components/
│ │ └── ChatMessages.jsx
│ ├── pages/
│ │ └── Chat.jsx
│ ├── socket/
│ │ └── socket.js
│ └── App.jsx

server/
├── server.js
├── public/
│ └── (static assets)
├── .env
```


---

## 🔧 Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Install dependencies
For the backend:

```bash
cd server
pnpm install
```

For the frontend:

```bash
cd client
pnpm install
```

### 3. Run the application
Start backend server:

```bash
pnpm run dev
```

Start frontend client:

```bash
pnpm run dev
```

Now visit: http://localhost:5173

##  🔒 Environment Variables
Create a .env file in the server/ directory:

```
PORT=5000
CLIENT_URL=http://localhost:5173
```


## 🧪 Testing & Usage Tips
Open in multiple tabs or browsers to simulate different users

Try sending private messages, switching rooms, or uploading files

Test reconnection by turning off your WiFi briefly

Enable browser notifications when prompted


## License

This project is licensed under the [MIT License](LICENSE).


## 👩🏽‍💻 Author
Developed by Wangari Jane 💻✨

