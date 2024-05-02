import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect, useState } from 'react';
import messageService from 'services/messageService';
import ChatSection from 'views/Message/components/ChatSection';
import Group from 'views/Message/components/Group';
import './styles.scss';

const Inner = memo(({ allGroups }) => {
    const [activeGrp, setActiveGrp] = useState(1);
    const [groupInfo, setGroupInfo] = useState([]);

    const getActiveGroupInfo = useCallback(async () => {
        try {
            const response = await messageService.getGroupById(activeGrp);
            if (response?.status === 200) {
                setGroupInfo(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [activeGrp]);

    useEffect(() => {
        getActiveGroupInfo();
    }, [getActiveGroupInfo]);

    return (
        <UserHomePageLayout>
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
                        />
                    ))}
                </div>
                <div className="message-section">
                    <ChatSection name={groupInfo?.name} activeGrp={activeGrp} />
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Message Inner';

export default Inner;
