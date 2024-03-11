import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import http from "../../utility/http-client";

const Ranking = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [rowNo, setRowNo] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);

  const sendQuickFight = (username, challenger, challengerEmail) => {
    socket.emit("challenge", {
      receiver: username,
      challenger,
      challengerEmail,
    });
  };

  const isAvailable = (level) => {
    if (currentLevel > level) return false;
    else if (currentLevel === level) {
      if (currentLevel !== rowNo.length)
        if (rowNo[currentLevel] - rowNo[currentLevel + 1] > 1) return true;
        else return false;
      else return false;
    } else if (currentLevel + 1 === level) return true;
    else return false;
  };

  useEffect(() => {
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
  }, []);

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
            <div>
              {players.map((levelUsers, index) => (
                <div key={index}>
                  <div className="flex flex-wrap space-x-4 py-4">
                    {levelUsers.map((user, subIndex) => (
                      <Card
                        key={subIndex}
                        uuid={user._id}
                        username={user.username}
                        email={user.email}
                        available={isAvailable(user.level)}
                        sendQuickFight={sendQuickFight}
                      >
                        <img
                          className="mx-auto h-16 w-16 flex-shrink-0 rounded-full"
                          src={user.avatar}
                          alt="user avatar"
                        ></img>
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
