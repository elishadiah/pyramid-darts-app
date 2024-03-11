import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { StarIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Calendar, momentLocalizer } from "react-big-calendar";
import http from "../../utility/http-client";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loading from "../../components/Loading";
import AchievementImages from "../../utility/images";
import AchievementVariables from "../../utility/variables";

const Profile = ({ socket }) => {
  const localizer = momentLocalizer(moment);
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    const tmp = JSON.parse(localStorage.getItem("authUser")).user;
    let avatar;
    if (
      tmp.hasOwnProperty("avatar") === false ||
      tmp.avatar === null ||
      tmp.avatar === ""
    )
      avatar = "";
    else avatar = tmp.avatar;
    const { username, email } = JSON.parse(
      localStorage.getItem("authUser")
    ).user;
    setUser({ username, email, avatar });
    fetchResult(username);
  }, []);

  const fetchResult = async (data) => {
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: data.trim(),
      });
      setResult(res.data);

      let breakfastImg, challengerImg, streakImg;

      AchievementVariables.BREAKFAST.map((val, index) => {
        if (index < AchievementVariables.BREAKFAST.length - 1) {
          if (
            val <= res.data.master26 &&
            res.data.master26 < AchievementVariables.BREAKFAST[index + 1]
          ) {
            breakfastImg = AchievementImages.BREAKFAST[index];
          }
        } else if (
          res.data.master26 >=
          AchievementVariables.BREAKFAST[
            AchievementVariables.BREAKFAST.length - 1
          ]
        ) {
          breakfastImg =
            AchievementImages.BREAKFAST[
              AchievementVariables.BREAKFAST.length - 1
            ];
        }
        return true;
      });

      AchievementVariables.FRIENDLYCHALLENGER.map((val, index) => {
        if (index < AchievementVariables.FRIENDLYCHALLENGER.length - 1) {
          if (
            val <= res.data.sentTotalChallengeNo &&
            res.data.sentTotalChallengeNo <
              AchievementVariables.FRIENDLYCHALLENGER[index + 1]
          ) {
            challengerImg = AchievementImages.FRIENDLY_CHALLENGER[index];
          }
        } else if (
          res.data.sentTotalChallengeNo >=
          AchievementVariables.FRIENDLYCHALLENGER[
            AchievementVariables.FRIENDLYCHALLENGER.length - 1
          ]
        ) {
          challengerImg =
            AchievementImages.FRIENDLY_CHALLENGER[
              AchievementVariables.FRIENDLYCHALLENGER.length - 1
            ];
        }
        return true;
      });

      AchievementVariables.STREAK.map((val, index) => {
        if (index < AchievementVariables.STREAK.length - 1) {
          if (
            val <= res.data.maxVictoryStreak &&
            res.data.maxVictoryStreak < AchievementVariables.STREAK[index + 1]
          ) {
            streakImg = AchievementImages.STREAK[index];
          }
        } else if (
          res.data.maxVictoryStreak >=
          AchievementVariables.STREAK[AchievementVariables.STREAK.length - 1]
        ) {
          streakImg =
            AchievementImages.STREAK[AchievementVariables.STREAK.length - 1];
        }
        return true;
      });

      const highIndex = res.data.highFinish.reduce((acc, element, index) => {
        if (Number(element) !== 0) {
          acc.push(index);
        }
        return acc;
      }, []);

      setAchievement({
        breakfast: breakfastImg,
        streak: streakImg,
        friendly: challengerImg,
        finishing: highIndex,
      });

      console.log(
        "--------Init-profile--result-------",
        res.data,
        "::::-->>",
        breakfastImg
      );
    } catch (err) {
      console.log("-------Init-profile--err---", err);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const events = [
    {
      id: 3,
      title: "Challenge 3",
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    },
    {
      id: 4,
      title: "Challenge 4",
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    },
  ];

  const addMinutes = (date, minutes) => {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(date.getMinutes() + minutes);
    return dateCopy;
  };

  return (
    <div className="relative sm:pb-24 bg-indigo-50 text-gray-900 dark:text-gray-900 dark:bg-gray-800">
      <Header current={0} socket={socket} />
      <div className="p-8">
        <div className="flex border border-gray-200 bg-white p-4 rounded-md">
          <div className="w-4/12 flex flex-col space-y-4">
            <div className="flex justify-center items-center">
              {user.avatar === "" ? (
                <img
                  src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                  className="rounded-md"
                  alt="user-avatar"
                />
              ) : (
                <img
                  src={user.avatar}
                  className="rounded-md w-72 h-72"
                  alt="user-avatar"
                />
              )}
            </div>
            <div className="text-left flex items-center">
              <p className="w-4 h-4 bg-green-400 inline-block mx-4" />
              I'm Online
            </div>
          </div>
          <div className="w-8/12 text-left">
            <p className="text-4xl mb-4">{user.username}</p>
            <p className="text-2xl mb-2 pb-1 border-b-2 border-gray-200">Leistung</p>
            {isLoading ? (
              <Loading />
            ) : (
              result && (
                <div className="flex flex-wrap items-center p-4 mb-4">
                  {result.sentTotalChallengeNo < 1 ? (
                    <div className="flex items-center">
                      <img
                        src={AchievementImages.FRIENDLY_CHALLENGER[0]}
                        className="opacity-50 w-14 h-14"
                        alt="achievement-icon"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src={achievement.friendly}
                        className="w-14 h-14"
                        alt="achievement-icon"
                      />
                    </div>
                  )}
                  {result.maxVictoryStreak < 1 ? (
                    <div className="flex items-center">
                      <img
                        src={AchievementImages.STREAK[0]}
                        className="opacity-50 w-14 h-12"
                        alt="achievement-icon"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src={achievement.streak}
                        className="w-14 h-12"
                        alt="achievement-icon"
                      />
                    </div>
                  )}
                  {result.master26 < 10 ? (
                    <div className="flex items-center">
                      <img
                        src={AchievementImages.BREAKFAST[0]}
                        className="opacity-50 w-14 h-14"
                        alt="achievement-icon"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src={achievement.breakfast}
                        className="w-14 h-14"
                        alt="achievement-icon"
                      />
                    </div>
                  )}
                  {result.highFinish.length === 0
                    ? AchievementImages.FINISHINGACE.map((val, index) => (
                        <div className="flex items-center" key={index}>
                          <img
                            src={val}
                            className="opacity-50 w-14 h-14"
                            alt="achievement-icon"
                          />
                        </div>
                      ))
                    : AchievementImages.FINISHINGACE.map((val, index) =>
                        achievement.finishing.includes(index) ? (
                          <div className="flex items-center" key={index}>
                            <img
                              src={val}
                              className="w-14 h-14"
                              alt="achievement-icon"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center" key={index}>
                            <img
                              src={val}
                              className="opacity-50 w-14 h-14"
                              alt="achievement-icon"
                            />
                          </div>
                        )
                      )}
                </div>
              )
            )}
          </div>
        </div>
        <div className="p-8 bg-white mt-8 rounded-md">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
