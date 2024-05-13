import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import userService from 'services/userService';
import Inner from 'views/LoveListPage/Inner';

const Wrapper = memo(() => {
    const [wishListTours, setWishListTours] = useState([]);
    const userId = getCustomerId();
    const token = getToken();

    const handleGetWishlistTours = useCallback(async () => {
        try {
            if (userId === 0) {
                return;
            }
            const response = await userService.getWishList(userId, token);
            if (response?.status === 200) {
                setWishListTours(response.data.data[0].tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        handleGetWishlistTours();
    }, [handleGetWishlistTours]);

    return <Inner wishListTours={wishListTours} />;
});

Wrapper.displayName = 'Love List';

const LoveListPage = Wrapper;

export default LoveListPage;
