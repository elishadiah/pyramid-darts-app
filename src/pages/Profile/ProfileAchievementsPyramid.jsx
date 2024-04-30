import { useState, useEffect } from "react";

import AchievementImages from "../../helper/images";
import HandleAchievement from "../../helper/achievements";
import AchievementItemComponent from "../../components/Profile/AchievementItem";
import authService from "../../services/auth.service";
import http from "../../helper/http-client";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import Loading from "../../components/Loading";
import AchievementLegendary from "../../components/Profile/AchievementLegendary";

const ProfileAchievementsPyramid = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { username } = authService.getAuthUser().user;
    fetchResult(username?.toLowerCase());
  }, []);

  const fetchResult = async (data) => {
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: data.trim(),
      });
      setResult(res.data);

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
      result: result?.pyramidClimber,
      achievement: "Climb the Pyramid",
      title: "Pyramid Climber",
      type: "both",
      max: 20,
      achievementIcons: AchievementImages.PYRAMIDCLIMBER,
      handleActive: HandleAchievement.pyramidClimber,
    },
    {
      result: {
        lifetime: result?.maxVictoryStreak,
        season: result?.seasonMaxVictoryStreak,
      },
      title: "Victory Streak",
      achievement: "Victory Streak",
      type: "both",
      max: 10,
      achievementIcons: AchievementImages.MAXVICTORYSTREAK,
      handleActive: HandleAchievement.streakActive,
    },

    {
      result: result?.challengeConqueror,
      achievement: "Accept a challenge and win the match",
      title: "Challenge Conqueror",
      type: "both",
      max: 50,
      achievementIcons: AchievementImages.CHALLENGECONQUEROR,
      handleActive: HandleAchievement.pyramidClimber,
    },
    {
      result: result?.monthlyMaestro,
      achievement: "Finish in the top Four Positions",
      title: "Monthly Maestro",
      type: "season",
      max: 9,
      achievementIcons: AchievementImages.MONTHLYMAESTRO,
      handleActive: HandleAchievement.monthlyMaestro,
    },
    {
      result: result?.pyramidProtector,
      achievement: "Defend the Position",
      title: "Pyramid Protector",
      type: "season",
      max: 20,
      achievementIcons: AchievementImages.PYRAMIDPROTECTOR,
      handleActive: HandleAchievement.pyramidProtector,
    },
  ];
  return (
    <ProfileLayout>
      {isLoading ? (
        <Loading />
      ) : (
        result && (
          <div className="p-4 shadow-md rounded-md">
            <div className="flex flex-col lg:flex-row sm:flex-wrap gap-4">
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
              <AchievementLegendary
                result={result?.legendaryRivalry}
                achievementIcons={AchievementImages.LEGENDARYRIVALRY}
                handleActive={HandleAchievement.legendaryRivalry}
              />
            </div>
          </div>
        )
      )}
    </ProfileLayout>
  );
};

export default ProfileAchievementsPyramid;
