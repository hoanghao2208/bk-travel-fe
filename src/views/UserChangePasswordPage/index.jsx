import { memo } from 'react';
import Inner from 'views/UserChangePasswordPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'User Change Password';

const UserChangePasswordPage = Wrapper;

export default UserChangePasswordPage;
