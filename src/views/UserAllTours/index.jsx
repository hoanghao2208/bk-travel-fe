import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { memo, useCallback, useEffect, useState } from 'react';
import tourService from 'services/tourService';
import Inner from 'views/UserAllTours/Inner';

dayjs.extend(isSameOrAfter);

const Wrapper = memo(() => {
    const [allTours, setAllTours] = useState([]);
    const [onlineTours, setOnlineTours] = useState([]);

    const handleGetOnlineTours = useCallback(async () => {
        try {
            const response = await tourService.getOnlineTour();
            if (response?.status === 200) {
                setAllTours(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        handleGetOnlineTours();
    }, [handleGetOnlineTours]);

    useEffect(() => {
        const now = dayjs().startOf('day');
        const isOnlineTours = allTours?.filter(tour =>
            dayjs(tour.deadline_book_time).isSameOrAfter(now)
        );
        const isAvailableTours = isOnlineTours.filter(
            tour => tour.booked_number !== tour.max_customer
        );
        setOnlineTours(isAvailableTours);
    }, [allTours]);

    return <Inner onlineTours={onlineTours} />;
});

Wrapper.displayName = 'User All Tours';

const UserAllTours = Wrapper;

export default UserAllTours;
