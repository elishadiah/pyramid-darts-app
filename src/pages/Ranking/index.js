import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import http from "../../utility/http-client";

const Ranking = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [rowNo, setRowNo] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);

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

  const isAvailable = (level) => {
    if (currentLevel > level) return false;
    else if (currentLevel === level) {
      if (currentLevel !== rowNo.length) {
        if (rowNo.length - currentLevel - 1 === 0) {
          if (rowNo[rowNo.length - currentLevel - 1] <= 4) {
            return false;
          } else {
            return true;
          }
        } else {
          if (
            rowNo[rowNo.length - currentLevel - 1] -
              rowNo[rowNo.length - currentLevel - 2] >
            2
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else return false;
    } else if (currentLevel + 1 === level) return true;
    else return false;
  };

  const fetchAllResult = async () => {
    setIsLoading(true);
    http
      .get("/result/fetch-all")
      .then((res) => {
        const levels = [];
        res.data.forEach((element) => {
          const level = element.level;
          if (!levels[level]) {
            levels[level] = [];
          }
          levels[level].push(element);
          JSON.parse(localStorage.getItem("authUser")).user.username ===
            element.username && setCurrentLevel(element.level);
        });
        setPlayers(levels.reverse());
        setRowNo(levels.map((val) => val.length));
        console.log("Result-->>>", levels);
      })
      .catch((err) => console.log("Res---err--->>", err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="relative sm:pb-24 dark:bg-gray-800">
      <div className="relative">
        <Header current={2} socket={socket} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
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
            <div className="flex flex-col divide-y divide-green-300 dark:divide-gray-400">
              {players.map((levelUsers, index) => (
                <div key={index} className="relative">
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 font-bold text-white bg-green-600 border-white rounded-full p-2 -top-4 -end-4">
                    {index + 1}
                  </div>
                  <div className="flex flex-wrap justify-center py-4">
                    {levelUsers.map((user, subIndex) => (
                      <Card
                        key={subIndex}
                        uuid={user._id}
                        username={user.username}
                        email={user.email}
                        available={isAvailable(user.level)}
                        sendQuickFight={sendQuickFight}
                        sendScheduledFight={sendScheduledFight}
                        // occupied={false}
                      >
                        {user.avatar ? (
                          <img
                            className="mx-auto h-16 w-16 flex-shrink-0 rounded-full"
                            src={user.avatar}
                            alt="user avatar"
                          ></img>
                        ) : (
                          <div className="mx-auto w-16 h-16 flex items-center justify-center flex-shrink-0 bg-green-200 rounded-full text-xl font-bold ">
                            {user.username.toLocaleUpperCase().charAt(0)}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
