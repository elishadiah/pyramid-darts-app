const handleMainResult = (data) => {
  let mainData;
  if (data) {
    mainData = data.map((val) => val.trim());
    const users = [mainData[0], mainData[1]];
    const mark = {
      challenger: Number(mainData[2]),
      receiver: Number(mainData[3]),
    };
    let matchOption = [],
      detail = [],
      subDetail = [];
    if (mainData.slice(4).length === 44) {
      matchOption = [mainData[4], mainData[5]];
    } else {
      matchOption = [mainData[4], mainData[5], mainData[6]];
    }
    mainData.slice(-42).map((val, index) => {
      if (index % 3 === 0) {
        subDetail.length && detail.push(subDetail);
        subDetail = [];
      }
      subDetail.push(val);
      index === 41 && detail.push(subDetail);
      return val;
    });
    console.log("Main-result-->>", { users, mark, matchOption, detail });
    return { users, mark, matchOption, detail };
  } else {
    return null;
  }
};

const getHighFinish = (firstArray, secondArray) => {
  const counts = [];

  // Create a map to store the counts of elements in the first array
  const map = new Map();
  for (const num of firstArray) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }

  // Count the occurrences of elements from the second array
  for (const num of secondArray) {
    counts.push(map.get(num) || 0);
  }

  return counts;
};

const getHighMarks = () => {
  const highMarks = [170, 167, 164, 161, 160, 158];
  for (let i = 157; i > 100; i--) {
    highMarks.push(i);
  }
  return highMarks;
};

const updateResult = (initData, result, detailResult) => {
  let user1 = [],
    user2 = [],
    user1_cnt26 = 0,
    user2_cnt26 = 0,
    user1_cntHigh = [],
    user2_cntHigh = [];

  const initUsersResult = initData.filter((val) =>
    result.users.includes(val.username)
  );
  if (initUsersResult.length !== 2) return false;

  // Pyramid rows number
  const levels = [];
  initData.forEach((element) => {
    const level = element.level;
    if (!levels[level]) {
      levels[level] = [];
    }
    levels[level].push(element);
  });
  const rowNo = levels.reverse().map((val) => val.length);

  detailResult &&
    detailResult.map((item) => {
      item.subResult.map((val, index) => {
        index % 4 < 1
          ? user1.push(Number(val))
          : index % 4 > 2 && user2.push(Number(val));
        return true;
      });
      return true;
    });

  // 26 master calculate
  user1_cnt26 = user1.filter((val) => val === 26).length;
  user2_cnt26 = user2.filter((val) => val === 26).length;
  // high finish
  user1_cntHigh = getHighFinish(user1, getHighMarks());
  user2_cntHigh = getHighFinish(user2, getHighMarks());

  const user1Init = initUsersResult.find(
    (val) => val.username === result.users[0]
  );
  const user2Init = initUsersResult.find(
    (val) => val.username === result.users[1]
  );

  // result update
  let user1Update = {
    ...user1Init,
    master26: user1Init.master26 + user1_cnt26,
    highFinish:
      user1Init.highFinish.length === 0
        ? user1_cntHigh
        : user1Init.highFinish.map((val, index) => val + user1_cntHigh[index]),
    currentVictoryStreak:
      result.mark.challenger > result.mark.receiver
        ? user1Init.previousWin === true
          ? user1Init.currentVictoryStreak + 1
          : 1
        : 0,
    previousWin: result.mark.challenger > result.mark.receiver ? true : false,
    totalWinNo:
      result.mark.challenger > result.mark.receiver
        ? user1Init.totalWinNo + 1
        : user1Init.totalWinNo,
    level:
      user1Init.level === user2Init.level
        ? result.mark.challenger < result.mark.receiver
          ? user1Init.level
          : rowNo.length - user1Init.level - 1 === 0
          ? user1Init.level + 1
          : rowNo[rowNo.length - user1Init.level - 1] -
              rowNo[rowNo.length - user1Init.level - 2] >
            2
          ? user1Init.level + 1
          : user1Init.level
        : result.mark.challenger > result.mark.receiver
        ? user2Init.level
        : user1Init.level,
  };
  user1Update = {
    ...user1Update,
    maxVictoryStreak:
      user1Update.currentVictoryStreak > user1Init.maxVictoryStreak
        ? user1Update.currentVictoryStreak
        : user1Init.maxVictoryStreak,
    sentTotalChallengeNo: user1Init.sentTotalChallengeNo,
  };

  let user2Update = {
    ...user2Init,
    master26: user2Init.master26 + user2_cnt26,
    highFinish:
      user2Init.highFinish.length === 0
        ? user2_cntHigh
        : user2Init.highFinish.map((val, index) => val + user2_cntHigh[index]),
    currentVictoryStreak:
      result.mark.challenger < result.mark.receiver
        ? user2Init.previousWin === true
          ? user2Init.currentVictoryStreak + 1
          : 1
        : 0,
    previousWin: result.mark.challenger < result.mark.receiver ? true : false,
    totalWinNo:
      result.mark.challenger < result.mark.receiver
        ? user2Init.totalWinNo + 1
        : user2Init.totalWinNo,
    level:
      user1Init.level === user2Init.level
        ? result.mark.challenger > result.mark.receiver
          ? user2Init.level
          : rowNo.length - user1Init.level - 1 === 0
          ? user2Init.level + 1
          : rowNo[rowNo.length - user2Init.level - 1] -
              rowNo[rowNo.length - user2Init.level - 2] >
            2
          ? user2Init.level + 1
          : user2Init.level
        : result.mark.challenger > result.mark.receiver
        ? user2Init.level
        : user1Init.level,
  };
  user2Update = {
    ...user2Update,
    maxVictoryStreak:
      user2Update.currentVictoryStreak > user2Init.maxVictoryStreak
        ? user2Update.currentVictoryStreak
        : user2Init.maxVictoryStreak,
  };
  return [user1Update, user2Update];
};

const handleResult = {
  handleMainResult,
  getHighFinish,
  getHighMarks,
  updateResult,
};

export default handleResult;
