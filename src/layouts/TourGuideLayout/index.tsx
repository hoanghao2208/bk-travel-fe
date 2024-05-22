import TourGuideHeader from 'components/TourGuideHeader';
import { FC, PropsWithChildren } from 'react';
import './styles.scss';

const TourGuideLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <TourGuideHeader />
            <div className="user-homepage__wrapper">{children}</div>
        </>
    );
};

export default TourGuideLayout;
