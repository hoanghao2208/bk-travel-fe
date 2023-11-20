import { memo } from 'react';
import Inner from 'views/UserProfilePage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'User Profile';

const UserProfile = Wrapper;

export default UserProfile;
