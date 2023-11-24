import { memo } from 'react';
import Inner from 'views/Register/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Register';

const Register = Wrapper;

export default Register;
