const isVariableEmpty = (value) => {
  if (value == null) {
    return true;
  }

  if (typeof value === "undefined") {
    return true;
  }

  if (!value) {
    return true;
  }

  if (value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

const convertStr = (str) => {
  return str.replace(/([A-Z])/g, " $1").toUpperCase();
};

const transformSummaryData = (data) => {
  return data?.summary
    ?.filter((item) => !isVariableEmpty(item))
    ?.map((item, index) => ({
      name: index + 1,
      Doubles: item?.doubles,
      First9Avg: item?.first9Avg,
      MatchAvg: item?.matchAvg,
      Ranking: item?.level,
    }));
};

const transformTableData = (data) => {
  return data
    .map((val, index) => ({
      id: val._id,
      ranking: val.level,
      avatar: val.avatar,
      name: val.username,
      breakfast: val.master26,
      streak: val.maxVictoryStreak,
      friendly: val.sentTotalChallengeNo,
      ready: val.readyForIt,
      dart: val.dartEnthusiast,
      consistentScorer: val.consistentScorer,
      ironDart: val.ironDart,
      monthlyMaestro: val.monthlyMaestro,
      pyramidProtector: val.pyramidProtector,
    }))
    .sort((a, b) => b.ranking - a.ranking);
};

export {
  isVariableEmpty,
  convertStr,
  transformSummaryData,
  transformTableData,
};
