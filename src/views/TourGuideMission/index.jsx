import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourService from 'services/tourService';
import Inner from 'views/TourGuideMission/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Hành trình tour du lịch';
    });

    const { tour_id } = useParams();

    const [tourData, setTourData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [column, setColumn] = useState(0);

    const handleGetTourData = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourData(response.data.data);
                const timeString = response.data.data.time;
                const columnNumber = parseInt(timeString.match(/\d+/)[0]);
                setColumn(columnNumber);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleGetSchedule = useCallback(async () => {
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
        handleGetSchedule();
    }, [handleGetSchedule]);

    return (
        <Inner
            tourData={tourData}
            scheduleData={scheduleData}
            column={column}
        />
    );
});

Wrapper.displayName = 'TourGuide Mission';

const TourGuideMission = Wrapper;

export default TourGuideMission;
