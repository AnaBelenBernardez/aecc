const { useState, useEffect } = require('react');
const { getAllNewsService } = require('../service');

const useGetAllNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadNews = async () => {
    try {
      setLoading(true);

      const data = await getAllNewsService();

      setNews(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  const refetch = () => {
    loadNews();
  };

  return { news, loading, error, refetch };
}

export default useGetAllNews;