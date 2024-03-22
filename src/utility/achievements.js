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

const achievement = {
  friendlyActive,
  streakActive,
  breakfastActive,
};

export default achievement;
