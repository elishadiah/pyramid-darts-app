import AchievementVariables from "./variables";

let newAchievements = [];

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
  console.log(
    "Result--->>>",
    data,
    "---->>>--->>>>",
    data.user1.init.summary,
    ":::---->>>--->>>",
    data.user1.init.summary.push({})
  );
  const availablePositionNo = Math.pow(2, 7 - data.user1.init.level);
  const currentAbovePlayersNo = data.allResult.filter(
    (val) => val.level === data.user1.init.level + 1
  ).length;
  const rowSpotNo = availablePositionNo - currentAbovePlayersNo;

  // result update
  let user1Update = {
    ...data.user1.init,
    currentVictoryStreak:
      data.user1.won > data.user2.won
        ? data.user1.init.previousWin === true
          ? data.user1.init.currentVictoryStreak + 1
          : 1
        : 0,
    seasonCurrentVictoryStreak:
      data.user1.won > data.user2.won
        ? data.user1.init.previousWin === true
          ? data.user1.init.seasonCurrentVictoryStreak + 1
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
    pyramidClimber: {
      lifetime:
        data.user1.init.level < data.user2.init.level &&
        data.user1.won > data.user2.won
          ? data.user1.init.pyramidClimber.lifetime + 1
          : data.user1.init.pyramidClimber.lifetime,
      season:
        data.user1.init.level < data.user2.init.level &&
        data.user1.won > data.user2.won
          ? data.user1.init.pyramidClimber.season + 1
          : data.user1.init.pyramidClimber.season,
    },
    pyramidProtector:
      data.user1.init.level > data.user2.init.level &&
      data.user1.won > data.user2.won
        ? data.user1.init.pyramidProtector + 1
        : data.user1.init.pyramidProtector,
    legendaryRivalry: data.user1.init.legendaryRivalry.find(
      (val) => val.opponent === data.user2.init.username?.toLowerCase()
    )
      ? data.user1.init.legendaryRivalry.map((val) =>
          val.opponent === data.user2.init.username?.toLowerCase()
            ? { ...val, lifetime: val.lifetime + 1, season: val.season + 1 }
            : { ...val }
        )
      : data.user1.init.legendaryRivalry.concat({
          opponent: data.user2.init.username?.toLowerCase(),
          lifetime: 1,
          season: 1,
        }),
    ironDart:
      data.user1.init.ironDart < data.matchResult.p1_doubles
        ? data.matchResult.p1_doubles
        : data.user1.init.ironDart,
    master180: {
      lifetime: data.matchResult.hasOwnProperty("p1_180")
        ? data.user1.init.master180.lifetime + data.matchResult?.p1_180
        : data.user1.init.master180.lifetime,
      season: data.matchResult.hasOwnProperty("p1_180")
        ? data.user1.init.master180.season + data.matchResult?.p1_180
        : data.user1.init.master180.season,
    },
    grandMaster: {
      leg:
        data.user1.init.grandMaster.leg > data.matchResult?.p1_match_avg
          ? data.user1.init.grandMaster.leg
          : data.matchResult?.p1_match_avg,
      match:
        data.user1.init.grandMaster.match > data.matchResult?.p1_match_avg
          ? data.user1.init.grandMaster.match
          : data.matchResult?.p1_match_avg,
    },
    maxMarksman: data.matchResult.hasOwnProperty("p1_171"),
    dartEnthusiast: data.user1.init.dartEnthusiast++,
  };

  let user2Update = {
    ...data.user2.init,
    currentVictoryStreak:
      data.user1.won < data.user2.won
        ? data.user2.init.previousWin === true
          ? data.user2.init.currentVictoryStreak + 1
          : 1
        : 0,
    seasonCurrentVictoryStreak:
      data.user1.won < data.user2.won
        ? data.user2.init.previousWin === true
          ? data.user2.init.seasonCurrentVictoryStreak + 1
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
    pyramidClimber: {
      lifetime:
        data.user2.init.level < data.user1.init.level &&
        data.user2.won > data.user1.won
          ? data.user2.init.pyramidClimber.lifetime + 1
          : data.user2.init.pyramidClimber.lifetime,
      season:
        data.user2.init.level < data.user1.init.level &&
        data.user2.won > data.user1.won
          ? data.user2.init.pyramidClimber.season + 1
          : data.user2.init.pyramidClimber.season,
    },
    challengeConqueror: {
      lifetime:
        data.user2.won > data.user1.won
          ? data.user2.init.challengeConqueror.lifetime + 1
          : data.user2.init.challengeConqueror.lifetime,
      season:
        data.user2.won > data.user1.won
          ? data.user2.init.challengeConqueror.season + 1
          : data.user2.init.challengeConqueror.season,
    },
    pyramidProtector:
      data.user1.init.level < data.user2.init.level &&
      data.user1.won < data.user2.won
        ? data.user2.init.pyramidProtector + 1
        : data.user2.init.pyramidProtector,
    legendaryRivalry: data.user2.init.legendaryRivalry.find(
      (val) => val.opponent === data.user1.init.username?.toLowerCase()
    )
      ? data.user2.init.legendaryRivalry.map((val) =>
          val.opponent === data.user1.init.username?.toLowerCase()
            ? { ...val, lifetime: val.lifetime + 1, season: val.season + 1 }
            : { ...val }
        )
      : data.user2.init.legendaryRivalry.concat({
          opponent: data.user1.init.username?.toLowerCase(),
          lifetime: 1,
          season: 1,
        }),
    ironDart:
      data.user2.init.ironDart < data.matchResult.p2_doubles
        ? data.matchResult.p2_doubles
        : data.user2.init.ironDart,
    master180: {
      lifetime: data.matchResult.hasOwnProperty("p2_180")
        ? data.user2.init.master180.lifetime + data.matchResult?.p2_180
        : data.user2.init.master180.lifetime,
      season: data.matchResult.hasOwnProperty("p2_180")
        ? data.user2.init.master180.season + data.matchResult?.p2_180
        : data.user2.init.master180.season,
    },
    grandMaster: {
      leg:
        data.user2.init.grandMaster.leg > data.matchResult?.p2_match_avg
          ? data.user2.init.grandMaster.leg
          : data.matchResult?.p2_match_avg,
      match:
        data.user2.init.grandMaster.match > data.matchResult?.p2_match_avg
          ? data.user2.init.grandMaster.match
          : data.matchResult?.p2_match_avg,
    },
    maxMarksman: data.matchResult.hasOwnProperty("p2_171"),
    dartEnthusiast: data.user2.init.dartEnthusiast++,
  };

  let cntBreakfast1 = 0,
    cntBreakfast2 = 0,
    cntConsistentScorer_1 = 0,
    cntConsistentScorer_2 = 0;

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
    }
    if (val[2].hasOwnProperty("to_finish")) {
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

    val[1].scores.map((item) => {
      if (item > 100) cntConsistentScorer_1++;
      return item;
    });
    val[2].scores.map((item) => {
      if (item > 100) cntConsistentScorer_2++;
      return item;
    });
  });

  user1Update = {
    ...user1Update,
    master26: user1Update.master26 + cntBreakfast1,
    maxVictoryStreak:
      user1Update.currentVictoryStreak > data.user1.init.maxVictoryStreak
        ? user1Update.currentVictoryStreak
        : data.user1.init.maxVictoryStreak + 1,
    seasonMaxVictoryStreak:
      user1Update.seasonCurrentVictoryStreak >
      data.user1.init.seasonMaxVictoryStreak
        ? user1Update.seasonCurrentVictoryStreak
        : data.user1.init.seasonMaxVictoryStreak + 1,
    sentTotalChallengeNo: Number(user1Update.sentTotalChallengeNo) + 1,
    monthlyMaestro:
      user1Update.level === 6
        ? data.user1.init.monthlyMaestro + 1
        : data.user1.init.monthlyMaestro,
    consistentScorer: cntConsistentScorer_1,
    championChallenger: data.user2.init.level === 6 ? true : false,
    date: new Date(data.begin),
    summary: data.user1.init.summary.concat({
      doubles: data.matchResult?.p1_doubles,
      master180: data.matchResult?.p1_180,
      first9Avg: data.matchResult?.p1_first9_avg,
      matchAvg: data.matchResult?.p1_match_avg,
      level: user1Update.level,
      date: new Date(data.begin),
    }),
  };

  user2Update = {
    ...user2Update,
    master26: user2Update.master26 + cntBreakfast2,
    maxVictoryStreak:
      user2Update.currentVictoryStreak > data.user2.init.maxVictoryStreak
        ? user2Update.currentVictoryStreak
        : data.user2.init.maxVictoryStreak + 1,
    seasonMaxVictoryStreak:
      user2Update.seasonCurrentVictoryStreak >
      data.user2.init.seasonMaxVictoryStreak
        ? user2Update.seasonCurrentVictoryStreak
        : data.user2.init.seasonMaxVictoryStreak + 1,
    readyForIt: Number(user2Update.readyForIt) + 1,
    monthlyMaestro:
      user2Update.level === 6
        ? data.user2.init.monthlyMaestro + 1
        : data.user2.init.monthlyMaestro,
    consistentScorer: cntConsistentScorer_2,
    date: new Date(data.begin),
    summary: data.user2.init.summary.concat({
      doubles: data.matchResult?.p2_doubles,
      master180: data.matchResult?.p2_180,
      first9Avg: data.matchResult?.p2_first9_avg,
      matchAvg: data.matchResult?.p2_match_avg,
      level: user2Update.level,
      date: new Date(data.begin),
    }),
  };

  console.log("Update-result--->>>", user1Update, user2Update);

  return [user1Update, user2Update];
};

const findUpdates = (obj1, obj2) => {
  const updates = {};
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      updates[key] = {
        old: obj2[key],
        new: obj1[key],
      };
    }
  }
  return updates;
};

function findModifiedProperties(obj1, obj2) {
  const modifiedProperties = {};

  for (let key in obj1) {
    if (key === "date") continue;
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      const nestedModifiedProperties = findModifiedProperties(
        obj1[key],
        obj2[key]
      );
      if (Object.keys(nestedModifiedProperties).length > 0) {
        modifiedProperties[key] = nestedModifiedProperties;
      }
    } else if (obj1[key] !== obj2[key]) {
      modifiedProperties[key] = {
        new: obj1[key],
        old: obj2[key],
      };
    }
  }

  return modifiedProperties;
}

function handleNewAchievementCheck(achievementName, achievement) {
  // let milestones = [1, 2, 3, 4, 5, 7, 10, 20, 25, 50, 100];
  let milestones = [];

  if (achievementName.includes("pyramidClimber"))
    milestones = [1, 3, 5, 10, 20];
  else if (achievementName.includes("challengeConqueror"))
    milestones = [3, 5, 10, 20, 50];
  else if (achievementName.includes("maxVictoryStreak"))
    milestones = [1, 2, 4, 6, 8, 10];
  else if (achievementName.includes("seasonMaxVictoryStreak"))
    milestones = [1, 2, 4, 6, 8, 10];
  else if (achievementName.includes("monthlyMaestro"))
    milestones = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  else if (achievementName.includes("pyramidProtector"))
    milestones = [1, 3, 5, 10, 20];
  else if (achievementName.includes("legendaryRivalry"))
    milestones = [1, 5, 10, 20, 50, 100];
  else if (achievementName.includes("ironDart"))
    milestones = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  else if (achievementName.includes("master180"))
    milestones = [1, 3, 5, 10, 20, 100];
  else if (achievementName.includes("consistentScorer"))
    milestones = [1, 5, 10, 20, 50];
  else if (achievementName.includes("master26"))
    milestones = [10, 30, 50, 100, 200, 300, 400, 750, 1000];
  else if (achievementName.includes("dartEnthusiast"))
    milestones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  else if (achievementName.includes("friendlyChallenger"))
    milestones = [1, 5, 10, 20, 50, 100];
  else if (achievementName.includes("readyForIt"))
    milestones = [1, 3, 5, 10, 25, 30, 35, 50];

  if (achievement.hasOwnProperty("new") && achievement.hasOwnProperty("old")) {
    for (let i = 0; i < milestones.length; i++) {
      let milestone = milestones[i];
      if (achievement.new >= milestone && achievement.old < milestone) {
        newAchievements.push({
          name: achievementName,
          value: milestone,
          index: i,
        });
      }
    }
  } else {
    for (let key in achievement) {
      if (achievement.hasOwnProperty(key)) {
        let nestedAchievement = achievement[key];
        if (
          (nestedAchievement.new !== undefined &&
            nestedAchievement.old !== undefined) ||
          (nestedAchievement.hasOwnProperty("lifetime") &&
            nestedAchievement.hasOwnProperty("season"))
        ) {
          handleNewAchievementCheck(
            achievementName + "." + key,
            nestedAchievement
          );
        }
      }
    }
  }
}

const handleAchievement = (data, origin) => {
  console.log(
    "Handle-achievement---->>>>>>>>>>>>",
    data,
    "::::",
    origin,
    "update--->>>>>>>>>>>>",
    findUpdates(data, origin),
    "update--->>>>>>>>>>>>",
    findModifiedProperties(data, origin)
  );
  newAchievements = [];
  const achievementData = findModifiedProperties(data, origin);
  for (var achievementName in achievementData) {
    if (achievementData.hasOwnProperty(achievementName)) {
      var achievement = achievementData[achievementName];
      handleNewAchievementCheck(achievementName, achievement);
    }
  }
  console.log("Achievement earned: ", newAchievements);
  return newAchievements;
};

const handleResult = {
  updateResult,
  handleAchievement,
};

export default handleResult;
