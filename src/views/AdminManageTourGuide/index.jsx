import { memo } from 'react';
import Inner from 'views/AdminManageTourGuide/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Manage Tour Guide';

const AdminManageTourGuide = Wrapper;

export default AdminManageTourGuide;
