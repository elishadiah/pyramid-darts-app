import { useEffect, useState, useCallback } from "react";
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
import AchievementImages from "../../helper/images";
import {
  cntAchievements,
  setTotalAchievements,
} from "../../helper/profileSummary";
import { Button } from "../../components/Button";
import CustomTextAreaComponent from "../../components/TextArea";
import { transformSummaryData } from "../../helper/helper";

const ProfileSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [cntAchievementsNo, setCntAchievementsNo] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState(null);

  const fetchResult = useCallback(async (user) => {
    const { username } = user;
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: username.trim()?.toLowerCase(),
      });
      setResult(transformSummaryData(res.data));
      setCntAchievementsNo(cntAchievements(res.data));
      fetchProfile();
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const user = authService.getAuthUser().user;
      const res = await http.get(`/auth/get-profile/${user?._id}`);
      setProfile({ introduction: res.data?.profile });
    } catch (err) {
      console.error(err);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const user = authService.getAuthUser().user;
    fetchResult(user);
  }, [fetchResult]);

  const onSave = async () => {
    setIsEditable(false);
    const user = authService.getAuthUser().user;
    try {
      const res = await http.post(`/auth/update-profile/${user?._id}`, {
        profile: profile?.introduction,
      });
      fetchProfile();
      console.log("--------profile--update-------", res.data);
    } catch (err) {
      console.log("-------profile--err---", err);
    }
  };

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
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
      <div className="w-full flex justify-end items-center mb-8">
        {isEditable ? (
          <Button className="py-2 px-4 rounded-md" onClick={onSave}>
            Save
          </Button>
        ) : (
          <Button
            className="py-2 px-4 rounded-md"
            onClick={() => setIsEditable(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="mb-8">
        {isEditable ? (
          <CustomTextAreaComponent
            name="introduction"
            placeholder="Please enter your introduction here..."
            value={profile?.introduction}
            handleTextArea={onChange}
          />
        ) : (
          <h5 className="w-full min-h-60 p-4 text-xl text-left border border-t-8 border-t-green-600 rounded-md cursor-pointer ">
            {profile?.introduction}
          </h5>
        )}
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
