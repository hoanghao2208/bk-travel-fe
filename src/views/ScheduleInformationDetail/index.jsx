import { memo } from 'react';
import Inner from 'views/ScheduleInformationDetail/Inner';
import './style.scss';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Schedule Information Detail';

const ScheduleInformationDetail = Wrapper;

export default ScheduleInformationDetail;
