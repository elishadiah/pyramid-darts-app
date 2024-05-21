import { useState } from "react";
import http from "../helper/http-client";
import { toast } from "react-toastify";

const useFormSubmit = (initialUrl = "") => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(initialUrl);
  const [result, setResult] = useState({});

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
      console.log("res", res.data);
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
