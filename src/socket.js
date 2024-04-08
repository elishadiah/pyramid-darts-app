import { io } from "socket.io-client";
import constant from "./utility/constant";

const socket = io(constant.URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
