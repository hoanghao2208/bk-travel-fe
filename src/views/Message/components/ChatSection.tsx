import { SendOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import Message from 'components/Message';
import { FC, memo, useCallback, useRef, useState } from 'react';
import { getCustomerId } from 'reducers/token/function';
import messageService from 'services/messageService';
import MessageItem from 'views/Message/components/MessageItem';
import '../styles.scss';

interface ChatSectionProps {
    name: string;
    activeGrp: number;
    socket: any;
    allMessage: any;
}

const ChatSection: FC<ChatSectionProps> = memo(
    ({ name, activeGrp, socket, allMessage }) => {
        const userId = getCustomerId();
        const contentRef = useRef<HTMLDivElement>(null);

        const [contentMessage, setContentMessage] = useState('');

        const getContentMessage = useCallback((e: any) => {
            setContentMessage(e.target.value);
        }, []);

        const handleSendMessage = useCallback(async () => {
            try {
                if (contentMessage !== '') {
                    socket.emit('send message', contentMessage, activeGrp);
                    // socket.emit('send message', {
                    //     msg: contentMessage,
                    //     room: activeGrp,
                    // });
                    const body = {
                        group_id: activeGrp,
                        user_id: userId,
                        content: contentMessage,
                    };
                    const response = await messageService.createMessage(body);
                    if (response?.status === 200) {
                        setContentMessage('');
                    }
                } else {
                    Message.sendWarning('Vui lòng nhập nội dung tin nhắn');
                    return;
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Đã có lỗi xãy ra vui lòng thử lại');
            }
        }, [activeGrp, contentMessage, socket, userId]);

        return (
            <div className="chat-section">
                <div className="chat-section--header">
                    <img
                        src="/images/group-chat.jpg"
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
                    <div ref={contentRef} />
                </div>
                <div className="chat-section--footer">
                    <div className="chat-section--footer--wrapper">
                        <Input
                            placeholder="Nhập tin nhắn của bạn tại đây"
                            value={contentMessage}
                            onChange={getContentMessage}
                            onPressEnter={handleSendMessage}
                        />
                        <Tooltip placement="top" title="Gửi tin nhắn">
                            <Button
                                icon={<SendOutlined />}
                                type="link"
                                onClick={handleSendMessage}
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }
);

ChatSection.displayName = 'Chat Section';

export default ChatSection;
