const BREAKFAST = [10, 30, 50, 100, 200, 300, 400, 750, 1000];
const STREAK = [1, 2, 4, 6, 8, 10];
const highMarks = [170, 167, 164, 161, 160, 158];
for (let i = 157; i > 100; i--) {
  highMarks.push(i);
}
const FINISHINGACE = [...highMarks];
const FRIENDLYCHALLENGER = [1, 5, 10, 20, 50, 100];

const variables = {
  BREAKFAST,
  STREAK,
  FINISHINGACE,
  FRIENDLYCHALLENGER,
};

export default variables;
