import { memo } from 'react';
import Inner from 'views/ScheduleDetailPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Schedule Detail';

const ScheduleDetailPage = Wrapper;

export default ScheduleDetailPage;
