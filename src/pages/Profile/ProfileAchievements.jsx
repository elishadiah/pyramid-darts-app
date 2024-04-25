import { useState, useEffect } from "react";

import AchievementImages from "../../helper/images";
import HandleAchievement from "../../helper/achievements";
import AchievementItemComponent from "../../components/Profile/AchievementItem";
import authService from "../../services/auth.service";
import http from "../../helper/http-client";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import Loading from "../../components/Loading";
import AchievementChampionChallenger from "../../components/Profile/AchievementChampionChallenger";

const ProfileAchievements = () => {
  const [result, setResult] = useState(null);
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
      result: result?.sentTotalChallengeNo,
      title: "Friendly Challenger",
      achievement: "Friendly Challenger",
      type: "season",
      max: 100,
      achievementIcons: AchievementImages.FRIENDLY_CHALLENGER,
      handleActive: HandleAchievement.friendlyActive,
    },
    {
      result: result?.readyForIt,
      title: "Accept a certain number of challenges",
      achievement: "Ready For It",
      type: "season",
      max: 50,
      achievementIcons: AchievementImages.READYFORIT,
      handleActive: HandleAchievement.readyForIt,
    },
    {
      result: result?.dartEnthusiast,
      title: "High Number of Matches or Challenges",
      achievement: "Dart Enthusiast",
      type: "season",
      max: 9,
      achievementIcons: AchievementImages.DARTENTHUSIAST,
      handleActive: HandleAchievement.dartEnthusiast,
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
              <AchievementChampionChallenger
                result={result?.championChallenger}
                achievementIcon={AchievementImages.CHAMPIONCHALLENGER}
              />
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
          </div>
        )
      )}
    </ProfileLayout>
  );
};

export default ProfileAchievements;
