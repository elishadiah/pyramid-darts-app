import { convertStr } from "../../helper/helper";
import AchievementImages from "../../helper/images";

const AchievementModalBoardCard = ({ val, type }) => (
  <div className="flex flex-col flex-wrap justify-center gap-2 items-center my-2">
    <div className="flex items-center w-12 h-12">
      <img
        className="w-12 h-12"
        src={
          AchievementImages[val?.name.toUpperCase().split(".")[0]][val?.index]
        }
        alt="achievement-icon"
      />
    </div>
    <p className="font-semibold text-xl text-center flex items-center dark:text-white">
      {type}
      {convertStr(val?.name.split(".")[0])}
      &nbsp;
      {val?.value}
    </p>
  </div>
);

const AchievementModalBoard = ({ data }) => (
  <div className="mt-4 max-h-80 overflow-auto custom-scrollbar">
    {data
      .filter(
        (val) =>
          !(val?.name.includes("lifetime") || val?.name.includes("season"))
      )
      .map((val, index) => (
        <AchievementModalBoardCard key={index} val={val} type="" />
      ))}
    {data
      .filter((val) => val?.name.includes("lifetime"))
      .map((val, index) => (
        <AchievementModalBoardCard key={index} val={val} type="LIFETIME: " />
      ))}
    {data
      .filter((val) => val?.name.includes("season"))
      .map((val, index) => (
        <AchievementModalBoardCard key={index} val={val} type="SEASON: " />
      ))}
  </div>
);

export default AchievementModalBoard;
