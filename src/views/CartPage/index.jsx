import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken, setCartCount } from 'reducers/token/function';
import userService from 'services/userService';
import Inner from 'views/CartPage/Inner';

const Wrapper = memo(() => {
    const userId = getCustomerId();
    const token = getToken();
    const [cartList, setCartList] = useState([]);
    const [selectedTour, setSelectedTour] = useState([]);
    const [reload, setReload] = useState(false);

    const getCartList = useCallback(async () => {
        try {
            const response = await userService.getCartByUser(userId, token);
            if (response?.status === 200) {
                setCartList(response.data.data);
                if (
                    response?.data.data !== null &&
                    response?.data.data.cart !== null
                ) {
                    const orderItems = response?.data.data.cart.order_items;
                    setCartCount(orderItems?.length);
                } else {
                    setCartCount(0);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        getCartList();
    }, [getCartList, reload]);

    return (
        <Inner
            cartList={cartList}
            reload={reload}
            setReload={setReload}
            selectedTour={selectedTour}
            setSelectedTour={setSelectedTour}
        />
    );
});

Wrapper.displayName = 'Cart Page';

const CartPage = Wrapper;

export default CartPage;
