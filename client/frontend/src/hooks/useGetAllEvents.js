"use client";

import { useState, useEffect } from "react";
import { getAllEventsService } from "../service/index";

const useGetAllEvents = (absolutely) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEventsService(absolutely);
      setEvents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const refetch = () => {
    loadEvents();
  };

  return { events, loading, error, refetch, setEvents };
};

export default useGetAllEvents;
