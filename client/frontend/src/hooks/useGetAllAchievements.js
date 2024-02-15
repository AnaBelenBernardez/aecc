"use client";

import { useState, useEffect } from "react";
import { getAllAchievementsService } from "../service";

const useGetAllAchievements = () => {
  const [achievements, setAchievements] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const loadAchievements = async () => {
    try {
      setLoading(true);

      const data = await getAllAchievementsService();

      setAchievements(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const refetch = () => {
    loadAchievements();
  };

  return { achievements, loading, error, refetch };
};

export default useGetAllAchievements;
