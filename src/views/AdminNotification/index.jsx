import { memo } from 'react';
import Inner from 'views/AdminNotification/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Notification';

const AdminNotification = Wrapper;

export default AdminNotification;
