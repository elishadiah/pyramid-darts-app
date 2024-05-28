import React from "react";
import images from "../helper/images";
import useFetchAllSeasons from "../hooks/useFetchAllSeasons";

const Footer = () => {
  const { currentSeason } = useFetchAllSeasons();

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
                    Active players in the last 30 days:{" "}
                    {currentSeason?.activeUsers}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Season: {currentSeason?.season}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(currentSeason?.seasonStart).toLocaleDateString()}{" "}
                    - {new Date(currentSeason?.seasonEnd).toLocaleDateString()}
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
