import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import authService from "../../services/auth.service";
import http from "../../helper/http-client";
import Loading from "../../components/Loading";
import { isVariableEmpty } from "../../helper/helper";
import AchievementImages from "../../helper/images";
import {
  cntAchievements,
  setTotalAchievements,
} from "../../helper/profileSummary";

const ProfileSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [cntAchievementsNo, setCntAchievementsNo] = useState(0);

  useEffect(() => {
    const user = authService.getAuthUser().user;
    fetchResult(user);
  }, []);

  const fetchResult = async (data) => {
    const { username } = data;
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: username.trim()?.toLowerCase(),
      });
      setResult(
        res.data?.summary
          ?.filter((item) => !isVariableEmpty(item))
          ?.map((item, index) => ({
            name: index,
            Doubles: item?.doubles,
            First9Avg: item?.first9Avg,
            MatchAvg: item?.matchAvg,
            Ranking: item?.level,
          }))
      );
      setCntAchievementsNo(cntAchievements(res.data));

      console.log("--------Init-profile--result-------", res.data);
    } catch (err) {
      console.log("-------Init-profile--err---", err);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileLayout>
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
          Introduction
        </h5>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={result}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Ranking"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Doubles" stroke="#82ca9d" />
            <Line type="monotone" dataKey="First9Avg" stroke="#99ff99" />
            <Line type="monotone" dataKey="MatchAvg" stroke="#00ff99" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ProfileLayout>
  );
};

export default ProfileSummary;
