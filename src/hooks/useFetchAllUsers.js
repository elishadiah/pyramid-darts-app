import { useState, useEffect } from "react";
import http from "../helper/http-client";

const useFetchAllUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchAllResult = async () => {
      setIsLoading(true);
      try {
        const res = await http.get("/auth/get-users");
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

export default useFetchAllUsers;
