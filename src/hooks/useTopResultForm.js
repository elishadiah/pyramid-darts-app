import { useState } from "react";
import { toast } from "react-toastify";
import http from "../helper/http-client";
import HandleResult from "../helper/result";
import authService from "../services/auth.service";

const useFormSubmit = (initialUrl = "") => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(initialUrl);
  const [result, setResult] = useState({});
  // const [briefResult, setBriefResult] = useState([]);
  // const [updateResult, setUpdateResult] = useState(null);

  const currentUser = authService.getAuthUser().user.username?.toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = resultUrl.split("/");
      url.splice(3, 0, "api");
      const res = await http.get("/result/get", {
        params: { url: url.join("/") },
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      setResult(res.data);
      const earnedAchievement = HandleResult.handleAchievement(
        HandleResult.updateResult(res.data).find(
          (val) => val?.username?.toLowerCase() === currentUser
        ),
        res.data?.allResult.find(
          (val) => val?.username?.toLowerCase() === currentUser
        )
      );
      console.log('Earned-achievements---------------->>>', earnedAchievement);
    } catch (err) {
      console.log(err);
      toast.warning(err.data);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setResultUrl(e.target.value);
  };

  return { isLoading, resultUrl, result, handleSubmit, onChange };
};

export default useFormSubmit;
