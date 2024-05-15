import TourGuideLayout from 'layouts/TourGuideLayout';
import { memo } from 'react';
import Group from 'views/Message/components/Group';
import ChatSection from 'views/TourGuideMessage/components/ChatSection';
import './style.scss';

const Inner = memo(() => {
    return (
        <TourGuideLayout>
            <div className="message">
                <div className="message-group">
                    <Group
                        name="Group số 1"
                        desc={'Nhóm hỗ trợ thông tin đến khách hàng'}
                        id={1}
                        activeGrp={1}
                    />
                </div>
                <div className="message-section">
                    <ChatSection />
                </div>
            </div>
        </TourGuideLayout>
    );
});

Inner.displayName = 'TourGuide Message Inner';

export default Inner;
