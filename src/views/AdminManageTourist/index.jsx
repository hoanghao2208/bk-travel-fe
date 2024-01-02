import { memo } from 'react';
import Inner from 'views/AdminManageTourist/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Manage Tourist';

const AdminManageTourist = Wrapper;

export default AdminManageTourist;
