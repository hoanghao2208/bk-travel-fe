import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import orderService from 'services/orderService';
import Inner from 'views/CanceledOrders/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Đơn hàng đã hủy';
    });

    const userId = getCustomerId();
    const token = getToken();
    const [canceledOrders, setCanceledOrders] = useState([]);

    const handleGetCanceledOrders = useCallback(async () => {
        try {
            const response = await orderService.getCanceledOrder(userId, token);
            if (response?.status === 200) {
                setCanceledOrders(response.data.failed_orders);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        handleGetCanceledOrders();
    }, [handleGetCanceledOrders]);

    return <Inner canceledOrders={canceledOrders} />;
});

Wrapper.displayName = 'Canceled Orders';

const CanceledOrders = Wrapper;

export default CanceledOrders;
