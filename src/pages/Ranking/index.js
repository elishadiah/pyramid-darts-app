import Card from "../../components/Card";
import Header from "../../components/Header";

const Ranking = () => {
  const players = [
    {
      username: "diah",
      score: "23",
      rate: "87%",
    },
    {
      username: "diah",
      score: "23",
      rate: "87%",
    },
    {
      username: "diah",
      score: "23",
      rate: "87%",
    },
    {
      username: "diah",
      score: "23",
      rate: "87%",
    },
    {
      username: "diah",
      score: "23",
      rate: "87%",
    },
    {
      username: "diah",
      score: "23",
      rate: "87%",
    },
    {
      username: "diah",
      score: "23",
      rate: "87%",
    },
  ];
  return (
    <div className="relative sm:pb-24 dark:bg-gray-800">
      <div className="relative">
        <Header current={2} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <div>
            {players.map((item, index) => (
              <Card username={item.username} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
