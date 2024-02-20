const { useState, useEffect } = require('react');
const { getAllBannersService } = require('../service'); // Adjust the service function for banners

const useGetAllBanners = () => {
  const [banners, setBanners] = useState([]); // Change variable names to banners
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadBanners = async () => {
    try {
      setLoading(true);

      const data = await getAllBannersService(); // Adjust the service function for banners

      setBanners(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const refetch = () => {
    loadBanners();
  };

  return { banners, loading, error, refetch }; // Change variable names to banners
};

export default useGetAllBanners;
