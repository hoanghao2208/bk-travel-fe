import TourGuideLayout from 'layouts/TourGuideLayout';
import { memo } from 'react';
import './style.scss';

const Inner = memo(() => {
    return (
        <TourGuideLayout>
            <div>Hello</div>
        </TourGuideLayout>
    );
});

Inner.displayName = 'TourGuide Mission';

export default Inner;
