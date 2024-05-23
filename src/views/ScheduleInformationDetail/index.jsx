import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourService from 'services/tourService';
import Inner from 'views/ScheduleInformationDetail/Inner';
import './style.scss';

const Wrapper = memo(() => {
    const { tour_id } = useParams();
    const [tourDetail, setTourDetail] = useState([]);
    const [scheduleDetail, setScheduleDetail] = useState([]);

    const handleGetDetailTour = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourDetail(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleGetSchedule = useCallback(async () => {
        try {
            const response = await tourService.getTourSchedule(tour_id);
            if (response?.status === 200) {
                setScheduleDetail(response.data.schedule_tour);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetDetailTour();
    }, [handleGetDetailTour]);

    useEffect(() => {
        handleGetSchedule();
    }, [handleGetSchedule]);

    return <Inner tourDetail={tourDetail} scheduleDetail={scheduleDetail} />;
});

Wrapper.displayName = 'Schedule Information Detail';

const ScheduleInformationDetail = Wrapper;

export default ScheduleInformationDetail;
