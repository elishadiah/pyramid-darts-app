import { useState } from "react";
import { toast } from "react-toastify";
import http from "../helper/http-client";
import HandleResult from "../helper/result";

const useFormSubmit = (initialUrl = "") => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(initialUrl);
  const [result, setResult] = useState({});
  const [earnedAchievement, setEarnedAchievement] = useState(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // const [updateResult, setUpdateResult] = useState(null);

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
      const earnedAchievement1 = HandleResult.handleAchievement(
        HandleResult.updateResult(res.data).find(
          (val) =>
            val?.username?.toLowerCase() ===
            res.data?.user1?.name?.toLowerCase()
        ),
        res.data?.allResult.find(
          (val) =>
            val?.username?.toLowerCase() ===
            res.data?.user1?.name?.toLowerCase()
        )
      );
      const earnedAchievement2 = HandleResult.handleAchievement(
        HandleResult.updateResult(res.data).find(
          (val) =>
            val?.username?.toLowerCase() ===
            res.data?.user2?.name?.toLowerCase()
        ),
        res.data?.allResult.find(
          (val) =>
            val?.username?.toLowerCase() ===
            res.data?.user2?.name?.toLowerCase()
        )
      );
      setEarnedAchievement({
        user1: earnedAchievement1,
        user2: earnedAchievement2,
      });
      setIsSummaryModalOpen(true);
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

  const onCloseSummaryMdal = () => {
    setIsSummaryModalOpen(false);
  };

  const handleSave = async () => {
    // setIsSaveModalOpen(true);
    // if (result?.user1?.won > result?.user2?.won) {
    //   result.winner = result.user1.name;
    // }
    // setIsLoading(true);
    // try {
    //   const res = await http.post("/result", result);
    //   toast.success(res.data);
    // } catch (err) {
    //   console.log(err);
    //   toast.warning(err.data);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return {
    isLoading,
    resultUrl,
    result,
    earnedAchievement,
    isSummaryModalOpen,
    handleSubmit,
    onCloseSummaryMdal,
    onChange,
    handleSave
  };
};

export default useFormSubmit;
