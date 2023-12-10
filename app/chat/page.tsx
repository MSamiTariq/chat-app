"use client";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/src/components/chat/page";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");

  var socket: any;
  socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

  return (
    <div className="bg-slate-50">
      <div
        className="h-screen flex flex-col justify-center items-center gap-4 "
        style={{ display: showChat ? "none" : "" }}
      >
        <input
          className="rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <input
          className="rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
          type="text"
          placeholder="room id"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        />
        <button
          className="rounded-md bg-purple-600 px-4 py-2 text-white font-bold shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => handleJoin()}
        >
          {!showSpinner ? (
            "Join"
          ) : (
            <div className="border-4 border-solid border-black/3 rounded-full h-5 w-5  border-t-4 border-indigo-500 animate-spin"></div>
          )}
        </button>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage socket={socket} roomId={roomId} username={userName} />
      </div>
    </div>
  );
}
