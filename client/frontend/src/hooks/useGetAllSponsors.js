const { useState, useEffect } = require('react');
const { getAllSponsorsService } = require('../service');

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