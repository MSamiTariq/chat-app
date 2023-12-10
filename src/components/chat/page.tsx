"use client";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

interface IMsgDataTypes {
  roomId: String | number;
  user: String;
  msg: String;
  time: String;
}

const ChatPage = ({ socket, username, roomId }: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId,
        user: username,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="p-6 rounded-md overflow-hidden bg-white shadow-md">
        <div style={{ marginBottom: "1rem" }}>
          <p>
            Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
          </p>
        </div>
        <div>
          {chat.map(({ roomId, user, msg, time }, key) => (
            <div
              key={key}
              className={
                user == username
                  ? "flex flex-row-reverse gap-1.5 mb-1.5"
                  : "flex items-center gap-1.5 mb-1.5"
              }
            >
              <span
                className="bg-slate-400 h-8 w-8 rounded-full border border-white border-solid flex justify-center items-center"
                style={{ textAlign: user == username ? "right" : "left" }}
              >
                {user.charAt(0)}
              </span>
              <h3 style={{ textAlign: user == username ? "right" : "left" }}>
                {msg}
              </h3>
            </div>
          ))}
        </div>
        <div className="flex">
          <form onSubmit={(e) => sendData(e)} className="flex gap-4">
            <input
              className="h-8 w-60 p-1"
              type="text"
              value={currentMsg}
              placeholder="Type your message.."
              onChange={(e) => setCurrentMsg(e.target.value)}
            />
            <button>
              <IoSend size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
