import { memo } from 'react';
import Inner from 'views/TourGuideHomePage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'TourGuide HomePage';

const TourGuideHomePage = Wrapper;

export default TourGuideHomePage;
