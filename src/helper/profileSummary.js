import AchievementImages from "./images";
import handleAchievements from "./achievements";

const cntAchievements = (result) => {
  let achievementsCnt = 0;
  achievementsCnt += AchievementImages.PYRAMIDCLIMBER.map((item, index) =>
    handleAchievements.pyramidClimber(index, result?.pyramidClimber.lifetime)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.CHALLENGECONQUEROR.map((item, index) =>
    handleAchievements.challengeConqueror(
      index,
      result?.challengeConqueror.lifetime
    )
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.MAXVICTORYSTREAK.map((item, index) =>
    handleAchievements.streakActive(index, result?.maxVictoryStreak)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.MONTHLYMAESTRO.map((item, index) =>
    handleAchievements.monthlyMaestro(index, result?.monthlyMaestro)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.PYRAMIDPROTECTOR.map((item, index) =>
    handleAchievements.pyramidProtector(index, result?.pyramidProtector)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.IRONDART.map((item, index) =>
    handleAchievements.ironDart(index, result?.ironDart)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.MASTER180.map((item, index) =>
    handleAchievements.master180(index, result?.master180.lifetime)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.CONSISTENTSCORER.map((item, index) =>
    handleAchievements.consistentScorer(index, result?.consistentScorer)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.MASTER26.map((item, index) =>
    handleAchievements.breakfastActive(index, result?.master26)
  ).filter((item) => item).length;
  achievementsCnt += handleAchievements.cntGrandMaster(
    result?.grandMaster.match
  );
  achievementsCnt += handleAchievements.cntGrandMaster(result?.grandMaster.leg);
  achievementsCnt += result?.maxMarksman ? 1 : 0;
  achievementsCnt += result?.highFinish.filter((item) => item).length;
  achievementsCnt += AchievementImages.DARTENTHUSIAST.map((item, index) =>
    handleAchievements.dartEnthusiast(index, result?.dartEnthusiast)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.FRIENDLYCHALLENGER.map((item, index) =>
    handleAchievements.friendlyActive(index, result?.sentTotalChallengeNo)
  ).filter((item) => item).length;
  achievementsCnt += AchievementImages.READYFORIT.map((item, index) =>
    handleAchievements.readyForIt(index, result?.readyForIt)
  ).filter((item) => item).length;
  achievementsCnt += result?.championChallenger ? 1 : 0;

  return achievementsCnt;
};

const setTotalAchievements = (result) => {
  const arr = [5, 10, 15, 20, 25];
  if (result >= 25) return 25;
  else if (result < 5) return 0;
  else
    for (let i = 0; i < arr.length - 1; i++) {
      if (result >= arr[i] && result < arr[i + 1]) return arr[i];
    }
};

export { cntAchievements, setTotalAchievements };
