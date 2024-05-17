import { useMemo } from "react";
import useFetchAllResult from "../../hooks/useFetchAllResult";
import images from "../../helper/images";
import Loading from "../Loading";

const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth.setHours(0, 0, 0, 0);
lastMonth.setDate(1);

const firstDayOfMonth = new Date(
  lastMonth.getFullYear(),
  lastMonth.getMonth(),
  1
);

const TopPlaces = ({ current }) => {
  const { isLoading, players } = useFetchAllResult();

  const topPlayers = useMemo(
    () => players?.filter((val) => val.level === 6),
    [players]
  );

  const topPlayersLastMonth = useMemo(
    () =>
      players?.filter((val) => {
        const playerDate = new Date(val.date.$date);
        return (
          val.level === 6 &&
          playerDate >= lastMonth &&
          playerDate < firstDayOfMonth
        );
      }),
    [players]
  );

  const displayData = current ? topPlayers : topPlayersLastMonth;

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : displayData.length ? (
        <div>
          {current ? (
            <h3 className="text-5xl font-bold my-8">
              Top Players in Current Season
            </h3>
          ) : (
            <h3 className="text-5xl font-bold my-8">
              Top Players in Last Season
            </h3>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {displayData?.map((player) => {
              return (
                <div
                  key={player._id}
                  className="w-full sm:w-48p lg:flex-1 relative flex max-w-sm lg:max-w-72 border border-2 border-yellow-600 p-4 bg-gray-800 text-white rounded-lg"
                >
                  <img
                    className="w-6 h-6 lg:w-4 lg:h-4 absolute top-2 right-2"
                    src={images.GOLDCROWN}
                    alt="top-place-bg"
                  />
                  <div className="relative flex items-center justify-center w-2/5">
                    {player.avatar ? (
                      <div className="relative text-4xl flex items-center justify-center font-bold w-28 h-28 rounded-full">
                        <img
                          className="absolute z-30 w-12 h-12 bottom-9 rounded-full"
                          src={player?.avatar}
                          alt="top-user"
                        />
                        <img
                          className="w-28"
                          src={images.TOPPLACE2}
                          alt="top-place-bg"
                        />
                      </div>
                    ) : (
                      <p className="relative text-4xl flex items-center justify-center p-2 font-bold w-28 h-28 rounded-full">
                        <span className="absolute z-30 w-12 h-12 bottom-9 rounded-full">
                          A
                        </span>
                        <img
                          className="w-28"
                          src={images.TOPPLACE2}
                          alt="top-place-bg"
                        />
                      </p>
                    )}
                  </div>
                  <div className="w-3/5 flex flex-col items-start sm:justify-center sm:items-center">
                    <p className="text-3xl lg:text-2xl font-semibold mb-2">
                      {player.username}
                    </p>
                    <button className="border px-2 py-1 rounded-lg">
                      Challenge
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TopPlaces;
