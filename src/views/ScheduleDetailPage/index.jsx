import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourService from 'services/tourService';
import Inner from 'views/ScheduleDetailPage/Inner';

const Wrapper = memo(() => {
    const { tour_id } = useParams();
    const [tourData, setTourData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);

    const handleGetTourData = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourData(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleGetScheduleData = useCallback(async () => {
        try {
            const response = await tourService.getTourSchedule(tour_id);
            if (response?.status === 200) {
                setScheduleData(response.data.schedule_tour.schedule_detail);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetTourData();
    }, [handleGetTourData]);

    useEffect(() => {
        handleGetScheduleData();
    }, [handleGetScheduleData]);

    return <Inner tourData={tourData} scheduleData={scheduleData} />;
});

Wrapper.displayName = 'Schedule Detail';

const ScheduleDetailPage = Wrapper;

export default ScheduleDetailPage;
