import { io } from "socket.io-client";
import { SOCKET_URL } from "./config/constants/index";

// Initialize Socket.IO client
const socket = io(SOCKET_URL, {
  autoConnect: true, // Connect manually when needed
});

export default socket;
