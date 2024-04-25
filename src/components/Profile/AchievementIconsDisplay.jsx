function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AchievementIconsDisplay = ({
  result,
  type,
  iconSize,
  achievementIcons,
  handleActive,
}) => {
  return (
    <>
      <div className="hidden md:flex flex-wrap md:flex-nowrap justify-center items-center p-4">
        {achievementIcons?.length < 8 ? (
          achievementIcons?.map((item, index) => (
            <div key={index} className="flex items-center">
              <img
                src={item}
                className={classNames(
                  handleActive(index, type === "both" ? result?.season : result)
                    ? ""
                    : "opacity-50",
                  iconSize
                )}
                alt="achievement-icon"
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
              {achievementIcons
                ?.slice(
                  0,
                  achievementIcons?.length % 2 === 0
                    ? Math.floor(achievementIcons?.length / 2)
                    : Math.floor(achievementIcons?.length / 2) + 1
                )
                .map((item, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={item}
                      className={classNames(
                        handleActive(
                          index,
                          type === "both" ? result?.season : result
                        )
                          ? ""
                          : "opacity-50",
                        iconSize
                      )}
                      alt="achievement-icon"
                    />
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              {achievementIcons
                ?.slice(
                  achievementIcons?.length % 2 === 0
                    ? Math.floor(achievementIcons?.length / 2)
                    : Math.floor(achievementIcons?.length / 2) + 1,
                  achievementIcons?.length
                )
                .map((item, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={item}
                      className={classNames(
                        handleActive(
                          index + Math.floor(achievementIcons?.length / 2),
                          type === "both" ? result?.season : result
                        )
                          ? ""
                          : "opacity-50",
                        iconSize
                      )}
                      alt="achievement-icon"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="md:hidden flex flex-wrap sm:flex-nowrap justify-between items-center p-4">
        {achievementIcons.map((item, index) => (
          <div key={index} className="w-[33%]">
            <img
              src={item}
              className={classNames(
                handleActive(index, result?.season) ? "" : "opacity-50",
                "w-full"
              )}
              alt="achievement-icon"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AchievementIconsDisplay;
