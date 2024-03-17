import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId } from 'reducers/token/function';
import userService from 'services/userService';
import Inner from 'views/LoveListPage/Inner';

const Wrapper = memo(() => {
    const [wishListTours, setWishListTours] = useState([]);
    const userId = getCustomerId();

    const handleGetWishlistTours = useCallback(async () => {
        try {
            if (userId === 0) {
                return;
            }
            const response = await userService.getWishList(userId);
            if (response?.status === 200) {
                setWishListTours(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    useEffect(() => {
        handleGetWishlistTours();
    }, [handleGetWishlistTours]);

    return <Inner wishListTours={wishListTours} />;
});

Wrapper.displayName = 'Love List';

const LoveListPage = Wrapper;

export default LoveListPage;
