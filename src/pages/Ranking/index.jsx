import { useEffect, useState } from "react";
import Header from "../../components/Header";
import http from "../../helper/http-client";
import SearchBar from "../../components/Rankings/SearchBar";
import Pyramid from "../../components/Rankings/Pyramid";
import socket from "../../socket";
import authService from "../../services/auth.service";
import OnlineCheck from "../../components/OnlineCheck";

const Ranking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [imgSize, setImgSize] = useState(16);
  const [users, setUsers] = useState([]);
  const [isOnlineShow, setIsOnlineShow] = useState(false);

  useEffect(() => {
    fetchAllResult();

    const sessionID = authService.getAuthUser().user._id;

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    const handleErr = (err) => {
      console.log("Socket--err-->>", err);
    };

    const handleUserID = ({ userID }) => {
      socket.userID = userID;
    };

    socket.on("user_id", handleUserID);
    socket.on("connect_error", handleErr);

    return () => {
      socket.off("connect_error", handleErr);
      socket.off("user_id", handleUserID);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleConnect = () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = true;
          user.status = "online";
        }
      });
      console.log("--connect");
    };

    const handleDisconnect = () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = false;
          user.status = "offline";
        }
      });
      console.log("--disconnect");
    };

    const handleUsers = (receivedUsers) => {
      console.log("--users");
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
    };

    const handleUserConnected = (user) => {
      console.log("--user connected", users);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((existingUser) => {
          if (existingUser.userID === user.userID) {
            return { ...existingUser, connected: true, status: "online" };
          }
          return existingUser;
        });

        const newUser = prevUsers.find(
          (existingUser) => existingUser.userID === user.userID
        );
        if (!newUser) {
          updatedUsers.push(user);
        }

        return updatedUsers;
      });
    };

    const handleUserDisconnected = (id) => {
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
          if (user.userID === id) {
            return { ...user, connected: false, status: "offline" };
          }
          return user;
        });

        return updatedUsers;
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("users", handleUsers);
    socket.on("user connected", handleUserConnected);
    socket.on("user disconnected", handleUserDisconnected);

    return () => {
      console.log("BBBB");

      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("users", handleUsers);
      socket.off("user connected", handleUserConnected);
      socket.off("user disconnected", handleUserDisconnected);
    };
  }, [users]);

  const sendQuickFight = (username, challenger, challengerEmail) => {
    http.post("/event/post", {
      content: `${challenger?.toLowerCase()} send a quick challenge to ${username?.toLowerCase()}`,
    });
    socket.emit("challenge", {
      content: `${challenger}(Email: ${challengerEmail}) has sent you the quick challenge Please login https://lidarts.org and accept the challenge. Your username must be same with username of lidarts.org`,
      to: users.find(
        (val) => val.username?.toLowerCase() === username?.toLowerCase()
      )?.userID,
    });
  };

  const sendScheduledFight = (
    selectedDate,
    challenger,
    challengerEmail,
    receiver,
    receiverEmail
  ) => {
    console.log("Select--date-->>", selectedDate);
    http.post("/event/post", {
      content: `${challenger} send a quick challenge to ${receiver}`,
    });
    socket.emit("schedule-challenge", {
      date: selectedDate,
      challenger,
      challengerEmail,
      receiver,
      receiverEmail,
    });
  };

  const fetchAllResult = async () => {
    setIsLoading(true);
    http
      .get("/result/fetch-all")
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => console.log("Res---err--->>", err))
      .finally(() => setIsLoading(false));
  };

  const onPlayerClick = (payload) => {
    setSelectedPlayer(payload);
  };

  const onSliderChange = (e) => {
    setImgSize(e.target.value);
  };

  return (
    <div className="relative sm:pb-24 dark:bg-gray-800">
      <div className="relative">
        <Header current={2} />
        <div className="flex px-6 lg:px-12 justify-center">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center gap-x-8 mt-44">
              <div
                className="inline-block h-12 w-12 animate-spin rounded-full text-green-600 dark:text-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4 flex-col sm:flex-row">
              {/* mobile */}
              <div className="flex w-full px-2 flex-col sm:hidden">
                <OnlineCheck
                  isOnlineShow={isOnlineShow}
                  setIsOnlineShow={setIsOnlineShow}
                />
                <SearchBar players={players} onPlayerClick={onPlayerClick} />
              </div>
              <div className="flex flex-col w-full py-4 md:w-8/12 sm:w-6/12 ">
                <div className="flex items-center space-x-4">
                  <p className="text-gray-900 dark:text-white">Zoom&nbsp;Out</p>
                  <input
                    id="medium-range"
                    type="range"
                    min={6}
                    max={16}
                    step={2}
                    className="w-full h-2 bg-gray-200 text-green-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    onChange={onSliderChange}
                  />
                  <p className="text-gray-900 dark:text-white">Zoom&nbsp;In</p>
                </div>
                <div className="overflow-y-auto py-4 max-h-70-vh divide-y divide-green-300 dark:divide-gray-400">
                  <Pyramid
                    onlineShow={isOnlineShow}
                    players={players}
                    selectedPlayer={selectedPlayer}
                    connectedUsers={users}
                    imgSize={imgSize}
                    sendQuickFight={sendQuickFight}
                    sendScheduledFight={sendScheduledFight}
                  />
                </div>
              </div>
              <div className="hidden px-2 sm:flex sm:flex-col sm:px-6 w-6/12 md:w-4/12">
                <OnlineCheck
                  isOnlineShow={isOnlineShow}
                  setIsOnlineShow={setIsOnlineShow}
                />
                <SearchBar players={players} onPlayerClick={onPlayerClick} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
