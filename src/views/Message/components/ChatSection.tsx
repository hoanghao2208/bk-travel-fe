import { SendOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import messageService from 'services/messageService';
import MessageItem from 'views/Message/components/MessageItem';
import '../styles.scss';

interface ChatSectionProps {
    name: string;
    activeGrp: number;
}

const ChatSection: FC<ChatSectionProps> = memo(({ name, activeGrp }) => {
    const [allMessage, setAllMessage] = useState([]);

    const getAllMessages = useCallback(async () => {
        try {
            const response = await messageService.getAllMessages(activeGrp);
            if (response?.status === 200) {
                setAllMessage(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [activeGrp]);

    useEffect(() => {
        getAllMessages();
    }, [getAllMessages]);

    return (
        <div className="chat-section">
            <div className="chat-section--header">
                <img
                    src="/images/slide2.jpg"
                    alt="gr-avatar"
                    className="chat-section--header--img"
                />
                <span className="chat-section--header--name">{name}</span>
            </div>
            <div className="chat-section--content">
                {allMessage.map((mess: any) => (
                    <MessageItem
                        key={mess.message_id}
                        messId={mess.user_id}
                        content={mess.content}
                        time={mess.createdAt}
                    />
                ))}
            </div>
            <div className="chat-section--footer">
                <div className="chat-section--footer--wrapper">
                    <Input placeholder="Nhập tin nhắn của bạn tại đây" />
                    <Tooltip placement="top" title="Gửi tin nhắn">
                        <Button icon={<SendOutlined />} type="link" />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
});

ChatSection.displayName = 'Chat Section';

export default ChatSection;
