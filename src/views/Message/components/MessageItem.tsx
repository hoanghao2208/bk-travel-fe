import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { FC, memo } from 'react';
import { getCustomerId } from 'reducers/token/function';
import { formattedTime } from 'utils/function/format';
import '../styles.scss';

interface MessageItemProps {
    content: string;
    messId: number;
    time: string;
    allTourGuideId?: any;
}

const MessageItem: FC<MessageItemProps> = memo(
    ({ content, messId, time, allTourGuideId }) => {
        const userId = getCustomerId();

        return (
            <div
                className={`message-wrapper ${
                    messId === userId ? 'display-time' : ''
                }`}
            >
                <Avatar size={36} icon={<UserOutlined />} />
                <div
                    className={`mess-component ${
                        messId === userId
                            ? 'message-component-reverse'
                            : 'message-component'
                    }`}
                >
                    {allTourGuideId.includes(messId) ? (
                        <span>Hướng dẫn viên</span>
                    ) : (
                        <span>Khách hàng {messId}</span>
                    )}
                    <div
                        className={`message-item ${
                            messId === userId ? 'my-message-item' : ''
                        }`}
                    >
                        {content}
                    </div>
                </div>
                <p className="message-item--time">{formattedTime(time)}</p>
            </div>
        );
    }
);

MessageItem.displayName = 'Message Item';

export default MessageItem;
