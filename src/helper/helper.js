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

const calculateCurrentMonthAverages = (objArray) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns zero-based month (0-11)

  const filteredObjects = objArray.filter((obj) => {
    const createdAt = new Date(obj.date);
    const createdMonth = createdAt.getMonth() + 1;
    return createdMonth === currentMonth;
  });

  if (filteredObjects.length === 0) {
    return {
      matchAvg: 0,
      first9Avg: 0,
      doubles: 0,
    }; // return empty object if there are no objects in the current month
  }

  const sum = {};
  const count = filteredObjects.length;

  filteredObjects.forEach((obj) => {
    for (const property in obj) {
      if (property !== "_id" && property !== "date") {
        if (sum.hasOwnProperty(property)) {
          sum[property] += obj[property];
        } else {
          sum[property] = obj[property];
        }
      }
    }
  });

  const averages = {};
  for (const property in sum) {
    averages[property] = parseFloat(sum[property] / count).toFixed(2);
  }

  return averages;
};

const transformSummaryData = (data) => {
  console.log(
    "--------Init-********profile--result-------",
    calculateCurrentMonthAverages(data?.summary)
  );
  if (data?.summary.length === 0)
    return {
      overall: { Doubles: 0, First9Avg: 0, MatchAvg: 0 },
      season: { Doubles: 0, First9Avg: 0, MatchAvg: 0 },
    };

  let avgDoubles = 0,
    avgFirst9Avg = 0,
    avgMatchAvg = 0;

  for (let i = 0; i < data?.summary.length; i++) {
    avgDoubles += data?.summary[i]?.doubles;
    avgFirst9Avg += data?.summary[i]?.first9Avg;
    avgMatchAvg += data?.summary[i]?.matchAvg;
  }

  avgDoubles = parseFloat(avgDoubles / data?.summary.length).toFixed(2);
  avgFirst9Avg = parseFloat(avgFirst9Avg / data?.summary.length).toFixed(2);
  avgMatchAvg = parseFloat(avgMatchAvg / data?.summary.length).toFixed(2);

  return {
    overall: {
      Doubles: avgDoubles,
      First9Avg: avgFirst9Avg,
      MatchAvg: avgMatchAvg,
    },
    season: calculateCurrentMonthAverages(data?.summary),
  };
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
  calculateCurrentMonthAverages,
};
