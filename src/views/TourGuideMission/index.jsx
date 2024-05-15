import { memo } from 'react';
import Inner from 'views/TourGuideMission/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'TourGuide Mission';

const TourGuideMission = Wrapper;

export default TourGuideMission;
