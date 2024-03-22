function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AchievementItemComponent = ({
  result,
  iconSize,
  max,
  achievementIcons,
  handleActive,
}) => {
  return (
    <div>
      <div className="hidden sm:flex flex-wrap sm:flex-nowrap justify-between items-center p-4">
        {achievementIcons.map((item, index) => (
          <div key={index} className="flex items-center">
            <img
              src={item}
              className={classNames(
                handleActive(index, result) ? "" : "opacity-50",
                iconSize
              )}
              alt="achievement-icon"
            />
          </div>
        ))}
      </div>

      <div className="sm:hidden flex flex-wrap sm:flex-nowrap justify-between items-center p-4">
        {achievementIcons.map((item, index) => (
          <div key={index} className="w-[33%]">
            <img
              src={item}
              className={classNames(
                handleActive(index, result) ? "" : "opacity-50",
                "w-full"
              )}
              alt="achievement-icon"
            />
          </div>
        ))}
      </div>

      <div className="w-full relative bg-gray-200 rounded-full">
        <div
          className="bg-green-600 h-3 sm:h-5 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{
            width: `${result < 1 ? 0 : result / (max / 100)}%`,
          }}
        ></div>
        <p className="absolute text-sm sm:text-md -top-1 sm:-top-0.5 translate-x-[50%] end-[50%]">{result / (max / 100)}%</p>
      </div>
    </div>
  );
};

export default AchievementItemComponent;
