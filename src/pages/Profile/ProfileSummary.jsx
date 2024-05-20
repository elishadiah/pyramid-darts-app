import { useEffect, useState, useCallback, useMemo } from "react";
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
import SummaryStaticCard from "../../components/Profile/SummaryStaticCard";

const ProfileSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [cntAchievementsNo, setCntAchievementsNo] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState(null);

  const user = useMemo(() => authService.getAuthUser().user, []);

  const fetchResult = useCallback(
    async (user) => {
      const { username } = user;
      setIsLoading(true);
      try {
        const res = await http.post("/result/fetch", {
          username: username.trim()?.toLowerCase(),
        });
        console.log("--------Init-profile--result-------", res.data);
        setResult(transformSummaryData(res.data));
        setCntAchievementsNo(cntAchievements(res.data));
        fetchProfile();
      } catch (err) {
        console.error(err);
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchProfile = useCallback(async () => {
    try {
      const res = await http.get(`/auth/get-profile/${user?._id}`);
      setProfile({ introduction: res.data?.profile });
    } catch (err) {
      console.error(err);
      setProfile(null);
    }
  }, [user]);

  useEffect(() => {
    fetchResult(user);
  }, [fetchResult, user]);

  const onSave = async () => {
    setIsEditable(false);
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
          <h5 className="w-full min-h-60 p-4 text-xl text-left dark:bg-black border border-t-4 border-t-green-600 dark:border-yellow-600 dark:border-t-green-600 rounded-md cursor-pointer ">
            {profile?.introduction
              ? profile?.introduction
              : "Introduction does not exist."}
          </h5>
        )}
      </div>
      <div className="text-left text-md md:text-xl lg:text-2xl dark:bg-black mb-8 p-4 border border-t-4 border-t-green-600 dark:border-yellow-600 dark:border-t-green-600 rounded-md">
        Last Online:{" "}
        <span className="font-bold">
          {new Date(user?.lastLoginDate).toLocaleString()}
        </span>
      </div>
      {isLoading ? <Loading /> : <SummaryStaticCard result={result} />}
    </ProfileLayout>
  );
};

export default ProfileSummary;
