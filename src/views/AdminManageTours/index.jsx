import { memo } from 'react';
import Inner from 'views/AdminManageTours/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Manage Tours';

const AdminManageTours = Wrapper;

export default AdminManageTours;
