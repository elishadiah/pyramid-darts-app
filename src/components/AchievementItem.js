function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AchievementItemComponent = ({ ...props }) => {
  const { result, achievement, iconSize, achievementIcons, handleActive } =
    props;
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center p-4">
        {achievementIcons.map((item, index) => (
          <div key={index} className="flex items-center">
            <img
              src={item}
              className={classNames(
                handleActive(index, achievement) ? "" : "opacity-50",
                iconSize
              )}
              alt="achievement-icon"
            />
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full">
        <div
          className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{
            width: `${
              result < 1 ? 0 : achievement
            }%`,
          }}
        >
          {result < 1 ? 0 : achievement}%
        </div>
      </div>
    </div>
  );
};

export default AchievementItemComponent;
