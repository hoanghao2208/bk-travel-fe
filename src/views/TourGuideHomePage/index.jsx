import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import tourGuideService from 'services/tourGuideService';
import Inner from 'views/TourGuideHomePage/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    const tourGuideId = getCustomerId();
    const token = getToken();

    const [allTasks, setAllTasks] = useState([]);

    const handleGetAllTasks = useCallback(async () => {
        try {
            const response = await tourGuideService.getAllTasksOfTourGuide(
                tourGuideId,
                token
            );
            if (response?.status === 200) {
                setAllTasks(response.data.tasks);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, tourGuideId]);

    useEffect(() => {
        handleGetAllTasks();
    }, [handleGetAllTasks]);

    return <Inner allTasks={allTasks} />;
});

Wrapper.displayName = 'TourGuide HomePage';

const TourGuideHomePage = Wrapper;

export default TourGuideHomePage;
