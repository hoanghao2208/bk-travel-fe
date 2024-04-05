import { memo } from 'react';
import Inner from 'views/PaymentSuccess/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Payment Success';

const PaymentSuccess = Wrapper;

export default PaymentSuccess;
