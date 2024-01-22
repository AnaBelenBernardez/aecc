const { useState, useEffect } = require('react');
const { getAllExperiencesService } = require('../service');

const useGetAllExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);

        const data = await getAllExperiencesService();

        setExperiences(data.experiences);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadExperiences();
  }, []);

  return { experiences, loading, error };
}

export default useGetAllExperiences;