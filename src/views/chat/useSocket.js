import { useEffect, useState } from "react";
import socket from "../../socket";

const useSocket = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join the chat room
    socket.emit("join-chat", chatId);

    setMessages([]);

    // Listen for incoming messages
    socket.on("receive-message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [chatId]);

  // sending message
  const sendMessage = ({ chatId, sender, content }) => {
    socket.emit("send-message", { chatId, sender, content });
  };

  return { messages, sendMessage };
};

export default useSocket;
