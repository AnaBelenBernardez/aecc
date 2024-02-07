const { useState, useEffect } = require('react');
const { getEventService } = require('../service');

const useGetEvent = (id) => {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadEvent = async () => {
      try {
        setLoading(true);

        const data = await getEventService(id);

        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    loadEvent();
  }, []);

  const refetch = () => {
    loadEvent();
  };

  return { event, loading, error, refetch };
}

export default useGetEvent;