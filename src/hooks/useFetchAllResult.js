import { useState, useEffect } from "react";
import http from "../helper/http-client";

const useFetchAllResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchAllResult = async () => {
      setIsLoading(true);
      try {
        const res = await http.get("/result/fetch-all");
        setPlayers(res.data);
      } catch (err) {
        console.error("Res---err--->>", err);
        // Show error message to user
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllResult();
  }, []);

  return { isLoading, players };
};

export default useFetchAllResult;
