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

const convertAchievementName = (str) => {
  if (
    str.includes("master") ||
    str.includes("maestro") ||
    str.includes("protector") ||
    str.includes("conqueror") ||
    str.includes("climber") ||
    str.includes("grand")
  ) {
    return str
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return str.replace(/([A-Z])/g, " $1").toUpperCase();
  }
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
  const filteredData = data?.summary.filter(
    (item) => item.doubles !== 0 && item.first9Avg !== 0 && item.matchAvg !== 0
  );

  if (filteredData.length === 0)
    return {
      overall: { Doubles: 0, First9Avg: 0, MatchAvg: 0 },
      season: { Doubles: 0, First9Avg: 0, MatchAvg: 0 },
    };

  let avgDoubles = 0,
    avgFirst9Avg = 0,
    avgMatchAvg = 0;

  filteredData.map((item) => {
    avgDoubles += item.doubles;
    avgFirst9Avg += item.first9Avg;
    avgMatchAvg += item.matchAvg;
  });

  avgDoubles = parseFloat(avgDoubles / filteredData.length).toFixed(2);
  avgFirst9Avg = parseFloat(avgFirst9Avg / filteredData.length).toFixed(2);
  avgMatchAvg = parseFloat(avgMatchAvg / filteredData.length).toFixed(2);

  return {
    overall: {
      Doubles: avgDoubles,
      First9Avg: avgFirst9Avg,
      MatchAvg: avgMatchAvg,
    },
    season: calculateCurrentMonthAverages(filteredData),
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
      grandMaster: val.grandMaster,
      challengeConqueror: val.challengeConqueror,
      pyramidClimber: val.pyramidClimber,
      seasonStreak: val.seasonMaxVictoryStreak,
      master180: val.master180,
    }))
    .sort((a, b) => b.ranking - a.ranking);
};

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

export {
  isVariableEmpty,
  convertStr,
  debounce,
  transformSummaryData,
  transformTableData,
  calculateCurrentMonthAverages,
  classNames,
  getRandomInt,
  convertAchievementName
};
