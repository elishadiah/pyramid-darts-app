import React, { useMemo } from "react";
import images from "../helper/images";
import useFetchAllUsers from "../hooks/useFetchAllUsers";

const Footer = () => {
  const { players } = useFetchAllUsers();

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
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  return (
    <footer>
      <div className="relative w-full">
        <div className="bg-main-bg-color dark:bg-gray-900">
          <div className="mx-auto max-w-2xl px-4 py-4 lg:max-w-4xl lg:px-12">
            <div className="flex justify-between items-center">
              <div className="flex flex-col justify-center items-center">
                <img className="w-24" src={images.LOGO} alt="logo" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  © 2024 Darts Fight Club
                </p>
              </div>
              <div>
                <div className="flex flex-col items-start">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active players in the last 30 days: {activePlayersNumber}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Season: {seasonNo}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {firstDayOfMonth.toLocaleDateString()} -{" "}
                    {lastDayOfMonth.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
