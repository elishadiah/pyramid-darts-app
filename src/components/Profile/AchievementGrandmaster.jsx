const AchievementGrandmaster = ({ result, achievementIcons, handleActive }) => {
  console.log("AchievementGrandmaster -> result", result);
  return (
    <div className="w-full lg:w-48p font-serif rounded-lg p-6 text-white shadow-green-900 shadow-md bg-gradient-to-br from-green-500 to-gray-900">
      <h2 className="font-semibold mb-4 text-3xl">Grand Master</h2>
      <div className="flex flex-wrap justify-center items-center  gap-x-4 mb-4">
        <p className="font-semibold">Achievement</p>
        <p className="opacity-70">Highest Average</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {result?.leg >= 50 ? (
          <div className="flex justify-center items-center">
            <img
              src={achievementIcons[`grand_${handleActive(result.leg)}_leg`]}
              className="w-28 h-28 sm:w-40 sm:h-40 md:w-28 md:h-28 lg:w-40 lg:h-40 xl:w-64 xl:h-64"
              alt="achievement-icon"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <img
              src={achievementIcons[`grand_50_leg`]}
              className="opacity-50 w-28 h-28 sm:w-40 sm:h-40 md:w-28 md:h-28 lg:w-40 lg:h-40 xl:w-64 xl:h-64"
              alt="achievement-icon"
            />
          </div>
        )}
        {result?.match >= 50 ? (
          <div className="flex items-center justify-center">
            <img
              src={
                achievementIcons[`grand_${handleActive(result.match)}_match`]
              }
              className="w-28 h-28 sm:w-40 sm:h-40 md:w-28 md:h-28 lg:w-40 lg:h-40 xl:w-64 xl:h-64"
              alt="achievement-icon"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img
              src={achievementIcons[`grand_50_match`]}
              className="opacity-50 w-28 h-28 sm:w-40 sm:h-40 md:w-28 md:h-28 lg:w-40 lg:h-40 xl:w-64 xl:h-64"
              alt="achievement-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementGrandmaster;
