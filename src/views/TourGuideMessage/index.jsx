import { memo } from 'react';
import Inner from 'views/TourGuideMessage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'TourGuide Message';

const TourGuideMessage = Wrapper;

export default TourGuideMessage;
