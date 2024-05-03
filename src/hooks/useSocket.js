import { useEffect } from "react";
import socket from "../socket";

const useSocket = (sessionID, handleErr, handleUserID) => {
  useEffect(() => {
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on("user_id", handleUserID);
    socket.on("connect_error", handleErr);

    return () => {
      socket.off("connect_error", handleErr);
      socket.off("user_id", handleUserID);
      socket.disconnect();
    };
  }, [sessionID, handleErr, handleUserID]);
};

export default useSocket;
