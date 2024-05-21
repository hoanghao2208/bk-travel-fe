import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo } from 'react';
import NoData from 'views/AdminManageCustomTours/components/NoData';
import ChatSection from 'views/Message/components/ChatSection';
import Group from 'views/Message/components/Group';
import './styles.scss';

const Inner = memo(
    ({ allGroups, socket, activeGrp, setActiveGrp, groupInfo, allMessage }) => {
        return (
            <UserHomePageLayout>
                {allGroups.length === 0 && (
                    <div className="message-nodata">
                        <NoData />
                    </div>
                )}
                {allGroups.length > 0 && (
                    <div className="message">
                        <div className="message-group">
                            {allGroups.map(group => (
                                <Group
                                    name={group.name}
                                    desc={
                                        group.description === null
                                            ? 'Nhóm hỗ trợ thông tin đến khách hàng'
                                            : group.description
                                    }
                                    id={group.group_id}
                                    activeGrp={activeGrp}
                                    setActiveGrp={setActiveGrp}
                                    key={group.group_id}
                                    socket={socket}
                                />
                            ))}
                        </div>
                        {activeGrp && (
                            <div className="message-section">
                                <ChatSection
                                    name={groupInfo?.name}
                                    activeGrp={activeGrp}
                                    socket={socket}
                                    allMessage={allMessage}
                                />
                            </div>
                        )}
                    </div>
                )}
            </UserHomePageLayout>
        );
    }
);

Inner.displayName = 'Message Inner';

export default Inner;
