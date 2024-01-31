const { useState, useEffect } = require('react');
const { getAllExperiencesService } = require('../service');


const useGetAllExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    useEffect(() => {
      loadExperiences();
    }, []);
  
    const refetch = () => {
      loadExperiences();
    };

  return { experiences, loading, error, refetch };
}

export default useGetAllExperiences;