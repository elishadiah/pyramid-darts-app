const friendlyActive = (item, val) => {
  const arr = [1, 5, 10, 20, 50, 100];
  if (arr[item] <= val) return true;
  else return false;
};

const streakActive = (item, val) => {
  const arr = [1, 2, 4, 6, 8, 10];
  if (arr[item] <= val) return true;
  else return false;
};

const breakfastActive = (item, val) => {
  const arr = [10, 30, 50, 100, 200, 300, 400, 750, 1000];
  if (arr[item] <= val) return true;
  else return false;
};

const pyramidClimber = (item, val) => {
  const arr = [1, 3, 5, 10, 20];
  if (arr[item] <= val) return true;
  else return false;
};

const monthlyMaestro = (item, val) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (arr[item] <= val) return true;
  else return false;
};

const pyramidProtector = (item, val) => {
  const arr = [1, 3, 5, 10, 20];
  if (arr[item] <= val) return true;
  else return false;
};

const ironDart = (item, val) => {
  const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  if (arr[item] <= val) return true;
  else return false;
};

const master180 = (item, val) => {
  const arr = [1, 3, 5, 10, 20, 100];
  if (arr[item] <= val) return true;
  else return false;
};

const consistentScorer = (item, val) => {
  const arr = [1, 5, 10, 20, 50];
  if (arr[item] <= val) return true;
  else return false;
};

const challengeConqueror = (item, val) => {
  const arr = [3, 5, 10, 20, 50];
  if (arr[item] <= val) return true;
  else return false;
};

const dartEnthusiast = (item, val) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (arr[item] <= val) return true;
  else return false;
};

const readyForIt = (item, val) => {
  const arr = [1, 3, 5, 10, 25, 30, 35, 50];
  if (arr[item] <= val) return true;
  else return false;
};

const legendaryRivalry = (val) => {
  const arr = [1, 5, 10, 20, 50, 100];
  if (val <= 1) return 0;
  else if (val >= 100) return arr.length - 1;
  else {
    for (let i = 0; i < arr.length - 1; i++) {
      if (val >= arr[i] && val < arr[i + 1]) return i;
    }
  }
};

const grandMaster = (val) => {
  const arr = [50, 60, 70, 90, 100, 110];
  if (val >= 110) return 110;
  else
    for (let i = 0; i < arr.length - 1; i++) {
      if (val >= arr[i] && val < arr[i + 1]) return arr[i];
    }
};

const achievement = {
  friendlyActive,
  streakActive,
  breakfastActive,
  pyramidClimber,
  monthlyMaestro,
  pyramidProtector,
  ironDart,
  master180,
  consistentScorer,
  challengeConqueror,
  dartEnthusiast,
  readyForIt,
  legendaryRivalry,
  grandMaster
};

export default achievement;
