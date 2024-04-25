import { useEffect, useState } from "react";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import authService from "../../services/auth.service";
import http from "../../helper/http-client";
import Loading from "../../components/Loading";

const ProfileSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const user = authService.getAuthUser().user;
    fetchResult(user);
  }, []);

  const fetchResult = async (data) => {
    const { username } = data;
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: username.trim(),
      });
      setResult(res.data);

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
      <div>
        <h5 className="w-full min-h-60 p-4 text-xl text-left border border-t-8 border-t-green-600 rounded-md cursor-pointer ">
          Introduction
        </h5>
      </div>
    </ProfileLayout>
  );
};

export default ProfileSummary;
