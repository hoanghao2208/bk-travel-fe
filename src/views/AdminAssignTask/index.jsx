import { memo } from 'react';
import Inner from 'views/AdminAssignTask/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Assign Task';

const AdminAssignTask = Wrapper;

export default AdminAssignTask;
