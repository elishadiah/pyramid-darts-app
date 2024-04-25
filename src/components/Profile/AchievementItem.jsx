import AchievementIconsDisplay from "./AchievementIconsDisplay";
import AchievementBody from "./AchievementBody";

const AchievementItemComponent = ({
  result,
  title,
  achievement,
  type,
  iconSize,
  max,
  achievementIcons,
  handleActive,
}) => {
  return (
    <div className="md:w-full lg:w-48p font-serif rounded-lg p-6 text-white shadow-green-900 shadow-md bg-gradient-to-br from-green-500 to-gray-900">
      <h2 className="font-semibold mb-4 text-3xl">{title}</h2>
      <AchievementBody
        result={result}
        type={type}
        max={max}
        achievement={achievement}
      />
      <AchievementIconsDisplay
        result={result}
        type={type}
        iconSize={iconSize}
        achievementIcons={achievementIcons}
        handleActive={handleActive}
      />
    </div>
  );
};

export default AchievementItemComponent;
