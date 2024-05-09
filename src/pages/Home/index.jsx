import { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header";
import logoImg from "../../assets/img/fc_logo.png";
import constant from "../../helper/constant";
import useFetchAllUsers from "../../hooks/useFetchAllUsers";
import Loading from "../../components/Loading";
import { getRandomInt } from "../../helper/helper.js";

const Home = () => {
  const { isLoading, players } = useFetchAllUsers();
  const [quote, setQuote] = useState(constant.quotes[0]);

  const activePlayersNumber = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return players.filter((player) => {
      const lastActive = new Date(player.lastLoginDate);
      return lastActive > thirtyDaysAgo;
    }).length;
  }, [players]);

  const seasonNo = useMemo(() => {
    const dates = players?.map((val) => val.createdAt);
    const oldestDate = dates.reduce((oldest, current) => {
      return current < oldest ? current : oldest;
    }, dates[0]);

    const currentMonth = new Date().getMonth();
    const oldestMonth = new Date(oldestDate).getMonth();
    return ((currentMonth - oldestMonth + 12) % 12) + 1;
  }, [players]);

  const date = new Date();
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  useEffect(() => {
    setQuote(constant.quotes[getRandomInt(0, constant.quotes.length)]);
  }, []);

  return (
    <div className="relative sm:pb-24 text-gray-900 dark:text-gray-100 dark:bg-gray-800 h-screen">
      <div className="relative">
        <Header current={1} />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-12">
            <div className="flex flex-col items-center mb-12 mt-24">
              <img className="w-80" src={logoImg} alt="logo-img" />
            </div>
            <div className="flex flex-col items-center mb-12">
              <h1 className="header-text text-6xl w-5/6">Darts Fight Club</h1>
            </div>
            <div className="text-3xl font-semibold shadow-md shadow-gray-300 border border-gray-200 p-4 mb-8 rounded-md dark:border-gray-800 dark:shadow-gray-700">
              <p className="mb-2">{quote.origin}</p>
              <p>{quote.additive}</p>
            </div>
            <div className="text-xl shadow-md shadow-gray-300 border border-gray-200 p-4 rounded-md dark:border-gray-800 dark:shadow-gray-700">
              <p className="mb-2">
                Season {seasonNo} currently running with {activePlayersNumber}{" "}
                Members.
              </p>
              <p>
                Season Ends in {lastDayOfMonth.getDate()} /{" "}
                {lastDayOfMonth.getHours()} / {lastDayOfMonth.getMinutes()} /{" "}
                {lastDayOfMonth.getSeconds()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
