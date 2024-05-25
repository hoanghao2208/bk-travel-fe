import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import userService from 'services/userService';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import Inner from 'views/LoveListPage/Inner';
import dayjs from 'dayjs';

dayjs.extend(isSameOrAfter);

const Wrapper = memo(() => {
    const [onlineTours, setOnlineTours] = useState([]);
    const userId = getCustomerId();
    const token = getToken();

    const handleGetWishlistTours = useCallback(async () => {
        try {
            if (userId === 0) {
                return;
            }
            const response = await userService.getWishList(userId, token);
            if (response?.status === 200) {
                const wishlistTour = response.data?.data[0]?.tours;
                if (wishlistTour.length > 0) {
                    const now = dayjs().startOf('day');
                    const isOnlineTours = wishlistTour?.filter(tour =>
                        dayjs(tour.deadline_book_time).isSameOrAfter(now)
                    );
                    const isAvailableTours = isOnlineTours.filter(
                        tour => tour.booked_number !== tour.max_customer
                    );
                    setOnlineTours(isAvailableTours);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        handleGetWishlistTours();
    }, [handleGetWishlistTours]);

    return <Inner onlineTours={onlineTours} />;
});

Wrapper.displayName = 'Love List';

const LoveListPage = Wrapper;

export default LoveListPage;
