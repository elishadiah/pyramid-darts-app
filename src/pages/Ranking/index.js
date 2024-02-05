import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";

const Ranking = () => {
  const players = [
    {
      username: "diah",
      score: 23,
      rate: "87%",
    },
    {
      username: "diah",
      score: 24,
      rate: "88%",
    },
    {
      username: "diah",
      score: 25,
      rate: "89%",
    },
    {
      username: "diah",
      score: 26,
      rate: "89%",
    },
    {
      username: "diah",
      score: 27,
      rate: "90%",
    },
    {
      username: "diah",
      score: 28,
      rate: "91%",
    },
    {
      username: "diah",
      score: 29,
      rate: "92%",
    },
    {
      username: "diah",
      score: 30,
      rate: "93%",
    },
    {
      username: "diah",
      score: 31,
      rate: "93%",
    },
    {
      username: "diah",
      score: 32,
      rate: "94%",
    },
    {
      username: "diah",
      score: 33,
      rate: "95%",
    },
    {
      username: "diah",
      score: 34,
      rate: "96%",
    },
    {
      username: "diah",
      score: 35,
      rate: "97%",
    },
    {
      username: "diah",
      score: 36,
      rate: "98%",
    },
    {
      username: "diah",
      score: 28,
      rate: "91%",
    },
    {
      username: "diah",
      score: 29,
      rate: "92%",
    },
    {
      username: "diah",
      score: 30,
      rate: "93%",
    },
    {
      username: "diah",
      score: 31,
      rate: "93%",
    },
    {
      username: "diah",
      score: 32,
      rate: "94%",
    },
    {
      username: "diah",
      score: 33,
      rate: "95%",
    },
    {
      username: "diah",
      score: 34,
      rate: "96%",
    },
    {
      username: "diah",
      score: 35,
      rate: "97%",
    },
    {
      username: "diah",
      score: 36,
      rate: "98%",
    },
  ];

  const compareScore = (a, b) => b.score - a.score;

  const [playerRank, setPlayerRank] = useState([
    [{ username: "", score: 0, rate: "" }],
  ]);

  useEffect(() => {
    let tmp = players;
    let i = 0,
      j = 4,
      res = [];
    tmp.sort(compareScore);
    tmp = [...tmp];
    // res[i] = tmp.splice(0, j);
    while (tmp.length > j) {
      res[i] = [...tmp.splice(0, j)];
      j++;
      i++;
    }
    res[res.length] = [...tmp];
    console.log("Test1--->>>", [...res]);
    setPlayerRank([...res]);
  }, []);

  return (
    <div className="relative sm:pb-24 dark:bg-gray-800">
      <div className="relative">
        <Header current={2} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <div>
            {playerRank.map((item, index) => (
              <div
                key={index}
                className="flex my-4 space-x-4 py-4 justify-center items-center"
              >
                {item.map((subItem, subIndex) => (
                  <Card key={index * 10 + subIndex} username={subItem.username}>
                    <img
                      className="mx-auto h-16 w-16 flex-shrink-0 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="user avatar"
                    ></img>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
