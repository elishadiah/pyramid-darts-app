import { useState, useEffect } from "react";

import AchievementImages from "../../helper/images";
import HandleAchievement from "../../helper/achievements";
import AchievementItemComponent from "../../components/Profile/AchievementItem";
import authService from "../../services/auth.service";
import http from "../../helper/http-client";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import Loading from "../../components/Loading";
import AchievementGrandmaster from "../../components/Profile/AchievementGrandmaster";
import AchievementMaxMarks from "../../components/Profile/AchievemetnMaxMarks";

const ProfileAchievementsPersonal = () => {
  const [result, setResult] = useState(null);
  const [achievement, setAchievement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { username } = authService.getAuthUser().user;
    fetchResult(username);
  }, []);

  const fetchResult = async (data) => {
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: data.trim(),
      });
      setResult(res.data);

      const highIndex = res.data.highFinish.reduce((acc, element, index) => {
        if (Number(element) !== 0) {
          acc.push(index);
        }
        return acc;
      }, []);

      setAchievement({
        finishing: highIndex,
      });

      console.log("--------Init-profile--result-------", res.data);
    } catch (err) {
      console.log("-------Init-profile--err---", err);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const achievementItems = [
    {
      result: result?.master180,
      title: "Maximum Score of 180",
      achievement: "180 Master",
      type: "both",
      max: 100,
      achievementIcons: AchievementImages.MASTER180,
      handleActive: HandleAchievement.master180,
    },
    {
      result: result?.master26,
      title: "Breakfast",
      achievement: "Breakfast",
      type: "season",
      max: 1000,
      achievementIcons: AchievementImages.MASTER26,
      handleActive: HandleAchievement.breakfastActive,
    },
    {
      result: result?.consistentScorer,
      title: "Score consistently over 100",
      achievement: "Consistent Scorer",
      type: "season",
      max: 50,
      achievementIcons: AchievementImages.CONSISTENTSCORER,
      handleActive: HandleAchievement.consistentScorer,
    },
    {
      result: result?.ironDart,
      title: "Highest Checkout Percentage",
      achievement: "Iron Dart",
      type: "season",
      max: 100,
      achievementIcons: AchievementImages.IRONDART,
      handleActive: HandleAchievement.ironDart,
    },
  ];
  return (
    <ProfileLayout>
      {isLoading ? (
        <Loading />
      ) : (
        result && (
          <div className="p-4 shadow-md rounded-md">
            <div className="flex flex-wrap gap-4">
              {result?.grandMaster?.match >= 50 && (
                <AchievementGrandmaster
                  result={result?.grandMaster}
                  achievementIcons={AchievementImages.GRANDMASTERAVERAGE}
                  handleActive={HandleAchievement.grandMaster}
                />
              )}
              {result?.maximumMarksman && (
                <AchievementMaxMarks
                  achievementIcon={AchievementImages.MAXIMUMMARKSMAN}
                />
              )}
              {achievementItems.map((item, index) => (
                <AchievementItemComponent
                  key={index}
                  result={item.result}
                  title={item.title}
                  achievement={item.achievement}
                  type={item.type}
                  max={item.max}
                  iconSize="w-16 h-12"
                  achievementIcons={item.achievementIcons}
                  handleActive={item.handleActive}
                />
              ))}
            </div>

            <div className="flex flex-wrap justify-center mt-8 max-h-40 sm:max-h-full sm:overflow-y-none overflow-y-auto">
              {AchievementImages.FINISHINGACE.map((val, index) =>
                achievement.finishing.includes(index) ? (
                  <div
                    className="sm:flex sm:items-center sm:w-20 w-[33.3%]"
                    key={index}
                  >
                    <img
                      src={val}
                      className="sm:w-20 sm:h-20 w-full"
                      alt="achievement-icon"
                    />
                  </div>
                ) : (
                  <div
                    className="sm:flex sm:items-center sm:w-20 w-[33.3%]"
                    key={index}
                  >
                    <img
                      src={val}
                      className="opacity-50 sm:w-20 sm:h-20 w-full"
                      alt="achievement-icon"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )
      )}
    </ProfileLayout>
  );
};

export default ProfileAchievementsPersonal;
