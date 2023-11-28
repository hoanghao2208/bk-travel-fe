import { memo } from 'react';
import Inner from 'views/AdminManageNotification/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Manage Notification';

const AdminManageNotification = Wrapper;

export default AdminManageNotification;
