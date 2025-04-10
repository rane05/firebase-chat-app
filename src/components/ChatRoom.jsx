import React, { useState, useRef } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, query, orderBy, serverTimestamp, limit } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { signOut } from "firebase/auth";
import "../App.css";

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(50));
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      displayName
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="chat-box">
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" disabled={!formValue}>
          🕊️ Send
        </button>
        <button onClick={() => signOut(auth)} className="signout-btn">
          🚪 Sign Out
        </button>
      </form>
    </>
  );
}

function ChatMessage({ message }) {
  const { text, uid, photoURL, displayName } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="user" />
      <div>
        <p className="name">{displayName}</p>
        <p className="text">{text}</p>
      </div>
    </div>
  );
}

export default ChatRoom;
