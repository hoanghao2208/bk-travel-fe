import { memo, useCallback, useEffect, useState } from 'react';
import orderService from 'services/orderService';
import Inner from 'views/PaymentSuccess/Inner';

const Wrapper = memo(() => {
    const [resultPayment, setResultPayment] = useState('');
    const hanldeGetPaymentResult = useCallback(async () => {
        try {
            const urlParams = window.location.search;
            const response = await orderService.getResultsPayment(urlParams);

            if (response?.status === 200) {
                setResultPayment(response.data.RspCode);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        hanldeGetPaymentResult();
    }, [hanldeGetPaymentResult]);

    return <Inner resultPayment={resultPayment} />;
});

Wrapper.displayName = 'Payment Success';

const PaymentSuccess = Wrapper;

export default PaymentSuccess;
