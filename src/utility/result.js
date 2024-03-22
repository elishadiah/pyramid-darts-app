import AchievementVariables from "./variables";

const getHighMarks = () => {
  const highMarks = [170, 167, 164, 161, 160, 158];
  for (let i = 157; i > 100; i--) {
    highMarks.push(i);
  }
  return highMarks;
};

const isEmpty = (data) => {
  if (data.length === 0 || data === null || data === undefined) return true;
  else return false;
};

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
    // master26: data.user1.init.master26 + data.user1.breakfast,
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

  let user2Update = {
    ...data.user2.init,
    // master26: data.user2.init.master26 + data.user2.breakfast,
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

  let cntBreakfast1 = 0,
    cntBreakfast2 = 0;

  Object.values(data.result).map((val) => {
    if (val[1].hasOwnProperty("to_finish")) {
      const high = getHighMarks().findIndex(
        (mark) => mark === val[1].scores[val[1].scores.length - 1]
      );
      if (high >= 0) {
        user1Update = {
          ...user1Update,
          highFinish: user1Update.highFinish.map((item, index) =>
            index === high ? 1 : item
          ),
        };
      }
    } else {
      const high = getHighMarks().findIndex(
        (mark) => mark === val[2].scores[val[2].scores.length - 1]
      );
      if (high >= 0) {
        user2Update = {
          ...user2Update,
          highFinish: user2Update.highFinish.map((item, index) =>
            index === high ? 1 : item
          ),
        };
      }
    }

    cntBreakfast1 += val[1].scores.filter((score) => score === 26).length;
    cntBreakfast2 += val[2].scores.filter((score) => score === 26).length;
  });

  user1Update = {
    ...user1Update,
    master26: user1Update.master26 + cntBreakfast1,
    maxVictoryStreak:
      user1Update.currentVictoryStreak > data.user1.init.maxVictoryStreak
        ? user1Update.currentVictoryStreak
        : data.user1.init.maxVictoryStreak + 1,
    sentTotalChallengeNo: Number(user1Update.sentTotalChallengeNo) + 1,
  };

  user2Update = {
    ...user2Update,
    master26: user2Update.master26 + cntBreakfast2,
    maxVictoryStreak:
      user2Update.currentVictoryStreak > data.user2.init.maxVictoryStreak
        ? user2Update.currentVictoryStreak + 2
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
