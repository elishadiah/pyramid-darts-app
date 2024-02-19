import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import http from "../../utility/http-client";

const Ranking = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  // const players = [
  //   {
  //     username: "diah",
  //     score: 23,
  //     rate: "87%",
  //   },
  //   {
  //     username: "diah",
  //     score: 24,
  //     rate: "88%",
  //   },
  //   {
  //     username: "diah",
  //     score: 25,
  //     rate: "89%",
  //   },
  //   {
  //     username: "diah",
  //     score: 26,
  //     rate: "89%",
  //   },
  //   {
  //     username: "diah",
  //     score: 27,
  //     rate: "90%",
  //   },
  //   {
  //     username: "diah",
  //     score: 28,
  //     rate: "91%",
  //   },
  //   {
  //     username: "diah",
  //     score: 29,
  //     rate: "92%",
  //   },
  //   {
  //     username: "diah",
  //     score: 30,
  //     rate: "93%",
  //   },
  //   {
  //     username: "diah",
  //     score: 31,
  //     rate: "93%",
  //   },
  //   {
  //     username: "diah",
  //     score: 32,
  //     rate: "94%",
  //   },
  //   {
  //     username: "diah",
  //     score: 33,
  //     rate: "95%",
  //   },
  //   {
  //     username: "diah",
  //     score: 34,
  //     rate: "96%",
  //   },
  //   {
  //     username: "diah",
  //     score: 35,
  //     rate: "97%",
  //   },
  //   {
  //     username: "diah",
  //     score: 36,
  //     rate: "98%",
  //   },
  //   {
  //     username: "diah",
  //     score: 28,
  //     rate: "91%",
  //   },
  //   {
  //     username: "diah",
  //     score: 29,
  //     rate: "92%",
  //   },
  //   {
  //     username: "diah",
  //     score: 30,
  //     rate: "93%",
  //   },
  //   {
  //     username: "diah",
  //     score: 31,
  //     rate: "93%",
  //   },
  //   {
  //     username: "diah",
  //     score: 32,
  //     rate: "94%",
  //   },
  //   {
  //     username: "diah",
  //     score: 33,
  //     rate: "95%",
  //   },
  //   {
  //     username: "diah",
  //     score: 34,
  //     rate: "96%",
  //   },
  //   {
  //     username: "diah",
  //     score: 35,
  //     rate: "97%",
  //   },
  //   {
  //     username: "diah",
  //     score: 36,
  //     rate: "98%",
  //   },
  // ];

  const compareScore = (a, b) => b.score - a.score;

  // const [playerRank, setPlayerRank] = useState([
  //   [{ username: "", score: 0, rate: "" }],
  // ]);

  const sendQuickFight = (username, challenger) => {
    socket.emit('challenge', {receiver: username, challenger});
  }

  useEffect(() => {
    setIsLoading(true);
    http
      .get("/auth/get")
      .then((res) => {
        console.log("Users--->>>>>", res.data.user);
        setPlayers(res.data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    // let tmp = players;
    // let i = 0,
    //   j = 4,
    //   res = [];
    // tmp.sort(compareScore);
    // tmp = [...tmp];
    // // res[i] = tmp.splice(0, j);
    // while (tmp.length > j) {
    //   res[i] = [...tmp.splice(0, j)];
    //   j++;
    //   i++;
    // }
    // res[res.length] = [...tmp];
    // console.log("Test1--->>>", [...res]);
    // setPlayerRank([...res]);
  }, []);

  return (
    <div className="relative sm:pb-24 dark:bg-gray-800">
      <div className="relative">
        <Header current={2} socket={socket} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center gap-x-8">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap my-4 space-x-4 py-4">
              {players.map((item, index) => (
                <Card
                  key={index}
                  uuid={item._id}
                  username={item.username}
                  score={0}
                  sendQuickFight={sendQuickFight}
                >
                  <img
                    className="mx-auto h-16 w-16 flex-shrink-0 rounded-full"
                    src={item.avatar}
                    alt="user avatar"
                  ></img>
                </Card>
              ))}
            </div>
          )}
          <div>
            {/* {playerRank.map((item, index) => (
              <div
                key={index}
                className="flex my-4 space-x-4 py-4 justify-center items-center"
              >
                {item.map((subItem, subIndex) => (
                  <Card key={index * 10 + subIndex} username={subItem.username} score={subItem.score}>
                    <img
                      className="mx-auto h-16 w-16 flex-shrink-0 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="user avatar"
                    ></img>
                  </Card>
                ))}
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
