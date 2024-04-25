const AchievementGrandmaster = ({ result, achievementIcons, handleActive }) => {
  return (
    <div className="w-full font-serif rounded-lg p-6 text-white shadow-green-900 shadow-md bg-gradient-to-br from-green-500 to-gray-900">
      <h2 className="font-semibold mb-4 text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">Highest Average</h2>
      <div className="flex flex-wrap justify-center items-center text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl gap-x-4 mb-4">
        <p className="font-semibold">Achievement</p>
        <p className="opacity-70">Grand Master</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <img
            src={achievementIcons[`grand_${handleActive(result.leg)}_leg`]}
            className="w-28 h-28 sm:w-40 sm:h-40 md:w-28 md:h-28 lg:w-40 lg:h-40 xl:w-64 xl:h-64"
            alt="achievement-icon"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src={achievementIcons[`grand_${handleActive(result.match)}_match`]}
            className="w-28 h-28 sm:w-40 sm:h-40 md:w-28 md:h-28 lg:w-40 lg:h-40 xl:w-64 xl:h-64"
            alt="achievement-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default AchievementGrandmaster;
