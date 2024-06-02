import { memo, useCallback, useEffect, useState } from 'react';
import { getToken } from 'reducers/token/function';
import orderService from 'services/orderService';
import Inner from 'views/PaymentSuccess/Inner';

const Wrapper = memo(() => {
    const token = getToken();

    const [resultPayment, setResultPayment] = useState('');
    const hanldeGetPaymentResult = useCallback(async () => {
        try {
            const urlParams = window.location.search;
            let response;
            if (urlParams.includes('Thanh+toan')) {
                response = await orderService.getResultsPayment(
                    urlParams,
                    token
                );
            } else {
                response = await orderService.getResultsCancelOrder(
                    urlParams,
                    token
                );
            }

            if (response?.status === 200) {
                setResultPayment(response.data.RspCode);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        hanldeGetPaymentResult();
    }, [hanldeGetPaymentResult]);

    return <Inner resultPayment={resultPayment} />;
});

Wrapper.displayName = 'Payment Success';

const PaymentSuccess = Wrapper;

export default PaymentSuccess;
