import { memo } from 'react';
import Inner from 'views/ForgotPassword/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Forgot Password';

const ForgotPassword = Wrapper;

export default ForgotPassword;
