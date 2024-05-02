import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import http from "../../helper/http-client";
import Loading from "../../components/Loading";
import AchievementImages from "../../helper/images";
import {
  cntAchievements,
  setTotalAchievements,
} from "../../helper/profileSummary";
import { Button } from "../../components/Button";
import { transformSummaryData } from "../../helper/helper";
import Header from "../../components/Header";
import SummaryStaticCard from "../../components/Profile/SummaryStaticCard";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [cntAchievementsNo, setCntAchievementsNo] = useState(0);
  const [user, setUser] = useState(null);
  const { username } = useParams();

  const fetchResult = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: username.trim()?.toLowerCase(),
      });
      setResult(transformSummaryData(res.data));
      setCntAchievementsNo(cntAchievements(res.data));
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await http.get(`/auth/get-user/${username}`);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchResult();
    fetchUserData();
  }, [fetchResult, fetchUserData, username]);

  const handleBack = () => {
    window.history.back();
  }

  return (
    <div className="relative sm:pb-24 bg-indigo-50 text-gray-900 dark:text-gray-900 dark:bg-gray-800">
      <Header current={4} />
      <div className="p-8">
        <div className="flex flex-col md:flex-row bg-white p-4 mb-4 rounded-md">
          <div className="flex flex-col w-full lg:w-3/12 p-4">
            <div className="flex justify-center items-center p-2">
              {user?.avatar === "" || user?.avatar === null ? (
                <img
                  src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                  className="rounded-md w-44 h-44"
                  alt="user-avatar"
                />
              ) : (
                <img
                  src={user?.avatar}
                  className="rounded-md w-44 h-44"
                  alt="user-avatar"
                />
              )}
            </div>
            <div className="text-center font-bold uppercase text-2xl md:text-sm xl:text-xl">
              {user?.username}
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-9/12 p-4">
            <div className="flex justify-end mb-4">
              <Button className="py-2 px-4 rounded-md" onClick={handleBack}>Back</Button>
            </div>
            {cntAchievementsNo >= 5 && (
              <div className="flex justify-center">
                <div className="w-1/2">
                  <img
                    src={
                      AchievementImages.HUNTER[
                        `hunter_${setTotalAchievements(cntAchievementsNo)}`
                      ]
                    }
                    alt="total achievement"
                  />
                </div>
              </div>
            )}
            <div className="mb-8">
              <h5 className="w-full min-h-60 p-4 text-xl text-left border border-t-8 border-t-green-600 rounded-md cursor-pointer ">
                {user?.profile}
              </h5>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <SummaryStaticCard result={result} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
