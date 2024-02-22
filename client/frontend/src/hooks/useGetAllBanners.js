const { useState, useEffect } = require('react');
const { getAllBannersService } = require('../service'); 

const useGetAllBanners = () => {
  const [banners, setBanners] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadBanners = async () => {
    try {
      setLoading(true);

      const data = await getAllBannersService();

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

  return { banners, loading, error, refetch }; 
};

export default useGetAllBanners;
