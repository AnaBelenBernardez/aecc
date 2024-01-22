const { useState, useEffect } = require('react');
const { getAllFaqsService } = require('../service');

const useGetAllFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        setLoading(true);

        const data = await getAllFaqsService();

        setFaqs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadFaqs();
  }, []);

  return { faqs, loading, error };
}

export default useGetAllFaqs;