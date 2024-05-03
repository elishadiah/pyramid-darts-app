import { useCallback, useEffect } from "react";
import socket from "../socket";

const useSocketEvents = (users, setUsers) => {
  const handleConnect = useCallback(() => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.self ? { ...user, connected: true, status: "online" } : user
      )
    );
  }, []);

  const handleDisconnect = useCallback(() => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.self ? { ...user, connected: false, status: "offline" } : user
      )
    );
  }, []);

  const handleUsers = useCallback(
    (receivedUsers) => {
      receivedUsers.forEach((user) => {
        const existingUserIndex = users.findIndex(
          (existingUser) => existingUser.userID === user.userID
        );
        if (existingUserIndex !== -1) {
          setUsers((prevUsers) => {
            const updatedUsers = [...prevUsers];
            updatedUsers[existingUserIndex].connected = user.connected;
            updatedUsers[existingUserIndex].status = user.status;
            return updatedUsers;
          });
        } else {
          user.self = user.userID === socket.userID;
          setUsers((prevUsers) => [...prevUsers, user]);
        }
      });
    },
    [users]
  );

  const handleUserConnected = useCallback((user) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((existingUser) =>
        existingUser.userID === user.userID
          ? { ...existingUser, connected: true, status: "online" }
          : existingUser
      );

      const newUser = prevUsers.find(
        (existingUser) => existingUser.userID === user.userID
      );
      if (!newUser) {
        updatedUsers.push(user);
      }

      return updatedUsers;
    });
  }, []);

  const handleUserDisconnected = useCallback((id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userID === id
          ? { ...user, connected: false, status: "offline" }
          : user
      )
    );
  }, []);

  useEffect(() => {
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("users", handleUsers);
    socket.on("user connected", handleUserConnected);
    socket.on("user disconnected", handleUserDisconnected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("users", handleUsers);
      socket.off("user connected", handleUserConnected);
      socket.off("user disconnected", handleUserDisconnected);
    };
  }, [
    handleConnect,
    handleDisconnect,
    handleUsers,
    handleUserConnected,
    handleUserDisconnected,
  ]);
};

export default useSocketEvents;
