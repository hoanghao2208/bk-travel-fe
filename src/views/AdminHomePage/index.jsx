import { memo } from 'react';
import Inner from 'views/AdminHomePage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Homepage';

const AdminHomePage = Wrapper;

export default AdminHomePage;
