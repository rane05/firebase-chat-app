import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import "./App.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <h1 className="header">🔥 Firebase Chat App</h1>
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

export default App;