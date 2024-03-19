import AchievementVariables from "./variables";

const updateResult = (data) => {
  console.log("Result--->>>", data);
  const availablePositionNo = Math.pow(2, 7 - data.user1.init.level);
  const currentAbovePlayersNo = data.allResult.filter(
    (val) => val.level === data.user1.init.level + 1
  ).length;
  const rowSpotNo = availablePositionNo - currentAbovePlayersNo;

  // result update
  let user1Update = {
    ...data.user1.init,
    master26: data.user1.init.master26 + data.user1.breakfast,
    currentVictoryStreak:
      data.user1.won > data.user2.won
        ? data.user1.init.previousWin === true
          ? data.user1.init.currentVictoryStreak + 1
          : 1
        : 0,
    previousWin: data.user1.won > data.user2.won ? true : false,
    totalWinNo:
      data.user1.won > data.user2.won
        ? data.user1.init.totalWinNo + 1
        : data.user1.init.totalWinNo,
    level:
      data.user1.init.level > data.user2.init.level
        ? data.user1.won > data.user2.won
          ? data.user1.init.level
          : data.user2.init.level
        : data.user1.init.level < data.user2.init.level
        ? data.user1.won > data.user2.won
          ? data.user2.init.level
          : data.user1.init.level
        : data.user1.won > data.user2.won
        ? rowSpotNo < 1
          ? data.user1.init.level
          : data.user1.init.level + 1
        : data.user1.init.level,
  };
  user1Update = {
    ...user1Update,
    maxVictoryStreak:
      user1Update.currentVictoryStreak > data.user1.init.maxVictoryStreak
        ? user1Update.currentVictoryStreak
        : data.user1.init.maxVictoryStreak,
    sentTotalChallengeNo: data.user1.init.sentTotalChallengeNo + 1,
  };

  let user2Update = {
    ...data.user2.init,
    master26: data.user2.init.master26 + data.user2.breakfast,
    currentVictoryStreak:
      data.user1.won < data.user2.won
        ? data.user2.init.previousWin === true
          ? data.user2.init.currentVictoryStreak + 1
          : 1
        : 0,
    previousWin: data.user1.won > data.user2.won ? false : true,
    totalWinNo:
      data.user1.won > data.user2.won
        ? data.user2.init.totalWinNo
        : data.user2.init.totalWinNo + 1,
    level:
      data.user1.init.level < data.user2.init.level
        ? data.user1.won > data.user2.won
          ? data.user1.init.level
          : data.user2.init.level
        : data.user1.init.level > data.user2.init.level
        ? data.user1.won > data.user2.won
          ? data.user2.init.level
          : data.user1.init.level
        : data.user1.won < data.user2.won
        ? rowSpotNo < 1
          ? data.user2.init.level
          : data.user2.init.level + 1
        : data.user2.init.level,
  };
  user2Update = {
    ...user2Update,
    maxVictoryStreak:
      user2Update.currentVictoryStreak > data.user2.init.maxVictoryStreak
        ? user2Update.currentVictoryStreak
        : data.user2.init.maxVictoryStreak,
  };

  console.log("Update-result--->>>", user1Update, user2Update);

  return [user1Update, user2Update];
};

const handleAcievement = (data, origin) => {
  const earnedAchievement = [];
  AchievementVariables.STREAK.find(
    (val) => Number(val) === Number(data.maxVictoryStreak)
  ) && earnedAchievement.push({ name: "STREAK", value: data.maxVictoryStreak });
  AchievementVariables.BREAKFAST.find((val) => val === Number(data.master26)) &&
    earnedAchievement.push({ name: "BREAKFAST", value: data.master26 });

  AchievementVariables.FRIENDLY_CHALLENGER.find(
    (val) => val === Number(data.sentTotalChallengeNo)
  ) &&
    earnedAchievement.push({
      name: "FRIENDLY_CHALLENGER",
      value: data.sentTotalChallengeNo,
    });

  let updateHighIndex = [];

  for (let i = 0; i < data.highFinish.length; i++) {
    if (data.highFinish[i] !== origin.highFinish[i]) {
      updateHighIndex.push(i);
    }
  }
  updateHighIndex.map((val) => {
    earnedAchievement.push({
      name: "FINISHINGACE",
      value: AchievementVariables.FINISHINGACE[val],
    });
    return true;
  });
  return earnedAchievement;
};

const handleResult = {
  updateResult,
  handleAcievement,
};

export default handleResult;
