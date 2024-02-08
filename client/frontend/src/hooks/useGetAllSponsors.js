"use client"

import { useState, useEffect } from 'react';
import { getAllSponsorsService } from '../service/index';

const useGetAllSponsors = () => {
  const [sponsors, setSponsors] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const loadSponsors = async () => {
    try {
      setLoading(true);

      const data = await getAllSponsorsService();

      setSponsors(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSponsors();
  }, []);

  return { sponsors, loading, error };
}

export default useGetAllSponsors;