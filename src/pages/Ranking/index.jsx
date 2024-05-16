import { useState, useCallback } from "react";
import http from "../../helper/http-client";
import SearchBar from "../../components/Rankings/SearchBar";
import Pyramid from "../../components/Rankings/Pyramid";
import socket from "../../socket";
import authService from "../../services/auth.service";
import OnlineCheck from "../../components/OnlineCheck";
import useFetchAllResult from "../../hooks/useFetchAllResult";
import useSocket from "../../hooks/useSocket";
import useSocketEvents from "../../hooks/useSocketEvents";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

const Ranking = () => {
  const sessionID = authService.getAuthUser().user._id;
  const { isLoading, players } = useFetchAllResult();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [imgSize, setImgSize] = useState(10);
  const [users, setUsers] = useState([]);
  const [isOnlineShow, setIsOnlineShow] = useState(false);

  const handleErr = useCallback((err) => {
    console.log("Socket--err-->>", err);
  }, []);

  const handleUserID = useCallback(({ userID }) => {
    socket.userID = userID;
  }, []);

  useSocket(sessionID, handleErr, handleUserID);

  useSocketEvents(users, setUsers);

  const sendQuickFight = useCallback(
    async (username, challenger, challengerEmail) => {
      try {
        await http.post("/event/post", {
          user: challenger,
          targetUser: username,
          eventType: "quick",
        });
        socket.emit("challenge", {
          message: `${challenger}(Email: ${challengerEmail}) has sent you the quick challenge.`,
          to: users.find(
            (val) => val.username?.toLowerCase() === username?.toLowerCase()
          )?.userID,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [users]
  );

  const sendScheduledFight = useCallback(
    async (
      selectedDate,
      challenger,
      challengerEmail,
      receiver,
      receiverEmail
    ) => {
      try {
        console.log("Select--date-->>", selectedDate);
        await http.post("/event/post", {
          user: challenger,
          targetUser: receiver,
          eventType: "schedule",
        });

        socket.emit("schedule-challenge", {
          message: `${challenger}(Email: ${challengerEmail}) has sent you the scheduled challenge. Challenge date: ${selectedDate}.`,
          to: users.find(
            (val) => val.username?.toLowerCase() === receiver?.toLowerCase()
          )?.userID,
          date: selectedDate,
          challenger,
          receiver,
          receiverEmail,
          challengerEmail,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [users]
  );

  const onPlayerClick = useCallback((payload) => {
    setSelectedPlayer(payload);
  }, []);

  const onSliderChange = useCallback((event) => {
    setImgSize(event.target.value);
  }, []);

  return (
    <Layout currentNo={2}>
      <div className="flex px-6 lg:px-12 justify-center">
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* mobile */}
          <div className="flex w-full px-2 flex-col lg:hidden">
            <OnlineCheck
              isOnlineShow={isOnlineShow}
              setIsOnlineShow={setIsOnlineShow}
            />
            {isLoading ? (
              <div className="flex flex-col gap-4">
                <Loading />
                <Loading />
                <Loading />
              </div>
            ) : (
              <SearchBar
                players={players}
                onPlayerClick={onPlayerClick}
                connectedUsers={users}
                isOnlineShow={isOnlineShow}
              />
            )}
          </div>
          <div className="flex flex-col w-full py-4 px-2 lg:w-8/12">
            <div className="flex items-center space-x-4">
              <p className="text-gray-900 dark:text-white">Zoom&nbsp;Out</p>
              <input
                id="medium-range"
                type="range"
                min={6}
                max={16}
                step={2}
                value={imgSize}
                className="w-full h-2 bg-gray-200 text-green-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={onSliderChange}
              />
              <p className="text-gray-900 dark:text-white">Zoom&nbsp;In</p>
            </div>
            <div className="overflow-y-auto py-4 max-h-70-vh divide-y divide-green-300 dark:divide-gray-400">
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  <Loading />
                  <Loading />
                  <Loading />
                  <Loading />
                  <Loading />
                </div>
              ) : (
                <Pyramid
                  onlineShow={isOnlineShow}
                  players={players}
                  selectedPlayer={selectedPlayer}
                  connectedUsers={users}
                  imgSize={imgSize}
                  sendQuickFight={sendQuickFight}
                  sendScheduledFight={sendScheduledFight}
                />
              )}
            </div>
          </div>
          <div className="hidden px-2 lg:flex lg:flex-col md:px-6 w-6/12 lg:w-4/12">
            <OnlineCheck
              isOnlineShow={isOnlineShow}
              setIsOnlineShow={setIsOnlineShow}
            />
            {isLoading ? (
              <div className="flex flex-col gap-4">
                <Loading />
                <Loading />
                <Loading />
              </div>
            ) : (
              <SearchBar
                players={players}
                onPlayerClick={onPlayerClick}
                connectedUsers={users}
                isOnlineShow={isOnlineShow}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ranking;
