const friendlyActive = (item, val) => {
  const arr = [1, 5, 10, 20, 50, 100];
  if (val === undefined || val === null || val === 0) return false;
  if (item === 0 && val === 1) return true;
  if (item === arr.length && val === 100) return true;
  let i = 1;
  for (i = 1; i < arr.length - 1; i++) {
    if (item === i && arr[i] >= val && arr[i - 1] < val) return true;
  }
};

const streakActive = (item, val) => {
  const arr = [1, 2, 4, 6, 8, 10];
  if (val === undefined || val === null || val === 0) return false;
  if (item === 0 && val === 1) return true;
  if (item === arr.length && val === 10) return true;
  let i = 1;
  for (i = 1; i < arr.length - 1; i++) {
    if (item === i && arr[i] >= val && arr[i - 1] < val) return true;
  }
};

const breakfastActive = (item, val) => {
  const arr = [10, 30, 50, 100, 200, 300, 400, 750, 1000];
  if (val === undefined || val === null || val === 0) return false;
  if (item === 0 && val === 10) return true;
  if (item === arr.length && val === 1000) return true;
  let i = 1;
  for (i = 1; i < arr.length - 1; i++) {
    if (item === i && arr[i] >= val && arr[i - 1] < val) return true;
  }
};

const achievement = {
  friendlyActive,
  streakActive,
  breakfastActive
};

export default achievement;
