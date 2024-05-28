import { useState, useEffect, useMemo } from "react";
import http from "../helper/http-client";

const useFetchAllSeasons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchAllSeasons = async () => {
      setIsLoading(true);
      try {
        const res = await http.get("/season/get-all");
        const resResult = await http.get("/result/fetch-all");

        const seasonData = res.data.map((item) => {
          const topMembers = resResult.data.filter((val) =>
            item.topMembers.includes(val._id)
          );
          return { ...item, topMembers };
        });

        setSeasons(seasonData);
      } catch (err) {
        console.error("Res---err--->>", err);
        // Show error message to user
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSeasons();
  }, []);

  const currentSeason = useMemo(
    () => seasons?.sort((b, a) => a?.season - b?.season)[0],
    [seasons]
  );

  const lastSeason = useMemo(
    () => seasons?.sort((b, a) => a?.season - b?.season)[1],
    [seasons]
  );

  return { isLoading, seasons, currentSeason, lastSeason };
};

export default useFetchAllSeasons;
