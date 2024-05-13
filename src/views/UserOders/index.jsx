import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import orderService from 'services/orderService';
import Inner from 'views/UserOders/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Đơn hàng của bạn';
    });

    const userId = getCustomerId();
    const token = getToken();
    const [completedOrders, setCompletedOrders] = useState([]);

    const handleGetCompletedOrders = useCallback(async () => {
        try {
            const response = await orderService.getCompletedOrder(
                userId,
                token
            );
            if (response?.status === 200) {
                setCompletedOrders(response.data.complete_orders);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        handleGetCompletedOrders();
    }, [handleGetCompletedOrders]);

    return <Inner completedOrders={completedOrders} />;
});

Wrapper.displayName = 'User Orders';

const UserOrders = Wrapper;

export default UserOrders;
