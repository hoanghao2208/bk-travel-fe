import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import orderService from 'services/orderService';
import Inner from 'views/PendingOrders/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Đơn hàng chưa thanh toán';
    });

    const userId = getCustomerId();
    const token = getToken();
    const [pendingOrders, setPendingOrders] = useState([]);

    const handleGetPendingOrders = useCallback(async () => {
        try {
            const response = await orderService.getPendingOrder(userId, token);
            if (response?.status === 200) {
                setPendingOrders(response.data.pending_orders);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        handleGetPendingOrders();
    }, [handleGetPendingOrders]);

    return <Inner pendingOrders={pendingOrders} />;
});

Wrapper.displayName = 'Pending Orders';

const PendingOrders = Wrapper;

export default PendingOrders;
