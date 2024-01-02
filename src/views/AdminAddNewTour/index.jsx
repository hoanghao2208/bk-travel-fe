import { memo } from 'react';
import Inner from 'views/AdminAddNewTour/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Add New Tour';

const AdminAddNewTour = Wrapper;

export default AdminAddNewTour;
