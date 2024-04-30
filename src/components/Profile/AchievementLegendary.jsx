import { useMemo } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { isVariableEmpty } from "../../helper/helper.js";

const AchievementLegendary = ({ result, achievementIcons, handleActive }) => {
  const achievements = useMemo(
    () => result.filter((item) => !isVariableEmpty(item.opponent)),
    [result]
  );
  return (
    <div className="w-full lg:w-48p font-serif rounded-lg p-6 text-white shadow-green-900 shadow-md bg-gradient-to-br from-green-500 to-gray-900">
      <h2 className="font-semibold mb-4 text-3xl">
        Legendary Rivalry
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-x-4 mb-4">
        <p className="font-semibold">Achievement</p>
        <p className="opacity-70">Challenge the same opponent multiple times</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="grid grid-cols-3 w-full text-md md:text-sm lg:text-xl gap-4">
          <p className="font-semibold">Opponent</p>
          <p className="font-semibold">Lifetime</p>
          <p className="font-semibold">Season</p>
        </div>
        <div className="w-full">
          {achievements.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <p className="flex justify-center items-center text-md md:text-xl">
                {item.opponent}
              </p>
              <div className="flex justify-center items-center">
                <div className="w-20 h-20">
                  <CircularProgressbarWithChildren
                    value={item.lifetime}
                    styles={{
                      path: {
                        stroke: `rgb(34 197 94)`,
                        strokeLinecap: "butt",
                        transition: "stroke-dashoffset 1s ease 0.5s",
                        transformOrigin: "center center",
                      },
                    }}
                  >
                    <div>
                      <div className="flex items-center">
                        <img
                          src={achievementIcons[handleActive(item.lifetime)]}
                          className="w-12 h-10"
                          alt="achievement-icon"
                        />
                      </div>
                      <p className="font-sans leading-3">{item.lifetime}</p>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-20 h-20">
                  <CircularProgressbarWithChildren
                    value={item.season}
                    styles={{
                      path: {
                        stroke: `rgb(34 197 94)`,
                        strokeLinecap: "butt",
                        transition: "stroke-dashoffset 1s ease 0.5s",
                        transformOrigin: "center center",
                      },
                    }}
                  >
                    <div>
                      <div className="flex items-center">
                        <img
                          src={achievementIcons[handleActive(item.season)]}
                          className="w-12 h-10"
                          alt="achievement-icon"
                        />
                      </div>
                      <p className="font-sans leading-3">{item.season}</p>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementLegendary;
