import { useEffect, useState } from "react";
import Card from "../../components/Rankings/Card";
import Header from "../../components/Header";
import http from "../../utility/http-client";
import SearchBar from "../../components/Rankings/SearchBar";
import Pyramid from "../../components/Rankings/Pyramid";

const Ranking = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [imgSize, setImgSize] = useState(16);

  useEffect(() => {
    fetchAllResult();
  }, []);

  useEffect(() => {
    socket.on("statusUpdate", (data) => {
      console.log("Occupied-status", data, "::", players);
    });
    socket.on("new-user-response", (data) => {
      console.log("New-user-->>", data);
      fetchAllResult();
    });
  }, [socket]);

  const sendQuickFight = (username, challenger, challengerEmail) => {
    socket.emit("challenge", {
      receiver: username,
      challenger,
      challengerEmail,
    });
  };

  const sendScheduledFight = (
    selectedDate,
    challenger,
    challengerEmail,
    receiver,
    receiverEmail
  ) => {
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
        console.log("Result-->>>", res.data);
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
        <Header current={2} socket={socket} />
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
              <div className="flex w-full px-2 sm:hidden">
                <SearchBar players={players} onPlayerClick={onPlayerClick} />
              </div>
              <div className="flex flex-col w-full py-4 md:w-8/12 sm:w-6/12 ">
                <div className="flex items-center space-x-4">
                  <p>Zoom&nbsp;In</p>
                  <input
                    id="medium-range"
                    type="range"
                    min={6}
                    max={16}
                    step={2}
                    className="w-full h-2 bg-gray-200 text-green-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    onChange={onSliderChange}
                  />
                  <p>Zoom&nbsp;Out</p>
                </div>
                <div className="overflow-y-auto py-4 max-h-70-vh divide-y divide-green-300 dark:divide-gray-400">
                  <Pyramid
                    players={players}
                    selectedPlayer={selectedPlayer}
                    imgSize={imgSize}
                    sendQuickFight={sendQuickFight}
                    sendScheduledFight={sendScheduledFight}
                  />
                </div>
              </div>
              <div className="hidden px-2 sm:flex sm:px-6 w-6/12 md:w-4/12">
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
