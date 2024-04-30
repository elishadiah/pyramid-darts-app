const AchievementChampionChallenger = ({ result, achievementIcon }) => {
  return (
    <div className="w-full lg:w-48p font-serif rounded-lg p-6 text-white shadow-green-900 shadow-md bg-gradient-to-br from-green-500 to-gray-900">
      <h2 className="font-semibold mb-4 text-3xl">
        Champion Challenger
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-x-4">
        <p className="font-semibold">Achievement</p>
        <p className="opacity-70">Challenger against the current monthly champion</p>
      </div>
      <div>
        <div className="flex justify-center items-center">
          <img
            src={achievementIcon}
            className={`w-28 h-28 sm:w-40 sm:h-40 md:w-28 md:h-28 ${
              result ? "" : "opacity-50"
            }`}
            alt="achievement-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default AchievementChampionChallenger;
