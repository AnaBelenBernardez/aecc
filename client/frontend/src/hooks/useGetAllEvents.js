import { useState, useEffect } from 'react';
import { getAllEventsService } from '../service/index';


const useGetAllEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);

                const data = await getAllEventsService();
                
                setEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    return { events, loading, error };
};

export default useGetAllEvents;