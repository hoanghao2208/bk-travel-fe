import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Tooltip } from 'antd';
import Message from 'components/Message';
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import messageService from 'services/messageService';
import MessageItem from 'views/Message/components/MessageItem';
import '../style.scss';

interface ChatSectionProps {
    name: string;
    activeGrp: number;
    socket: any;
    allMessage: any;
    allTourGuideId: any;
}

const ChatSection: FC<ChatSectionProps> = memo(
    ({ name, activeGrp, socket, allMessage, allTourGuideId }) => {
        const [openModalAddMember, setOpenModalAddMember] = useState(false);

        const [form] = Form.useForm();
        const userId = getCustomerId();
        const token = getToken();
        const contentRef = useRef<HTMLDivElement>(null);

        const [contentMessage, setContentMessage] = useState('');

        const getContentMessage = useCallback((e: any) => {
            setContentMessage(e.target.value);
        }, []);

        useEffect(() => {
            if (contentRef.current) {
                contentRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            }
        }, [allMessage]);

        const handleSendMessage = useCallback(async () => {
            try {
                if (contentMessage !== '') {
                    socket.emit(
                        'send message',
                        contentMessage,
                        activeGrp,
                        userId
                    );
                    const body = {
                        group_id: activeGrp,
                        user_id: userId,
                        content: contentMessage,
                    };
                    const response = await messageService.createMessage(
                        body,
                        token
                    );
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
        }, [activeGrp, contentMessage, socket, token, userId]);

        return (
            <div className="chat-sections">
                <div className="chat-sections--wrapper-header">
                    <div className="chat-sections--header">
                        <img
                            src="/images/group-chat.jpg"
                            alt="gr-avatar"
                            className="chat-sections--header--img"
                        />
                        <span className="chat-sections--header--name">
                            {name}
                        </span>
                    </div>
                    <Tooltip placement="top" title="Thêm thành viên">
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => setOpenModalAddMember(true)}
                        />
                    </Tooltip>
                </div>
                <div className="chat-section--content">
                    {allMessage.map((mess: any) => (
                        <MessageItem
                            key={mess.message_id}
                            messId={mess.user_id}
                            content={mess.content}
                            time={mess.createdAt}
                            allTourGuideId={allTourGuideId || []}
                        />
                    ))}
                    <div ref={contentRef} />
                </div>
                <div className="chat-sections--footer">
                    <div className="chat-sections--footer--wrapper">
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
                <Modal
                    title="Thêm thành viên"
                    open={openModalAddMember}
                    onCancel={() => setOpenModalAddMember(false)}
                    footer={[
                        <Button
                            key="back"
                            onClick={() => setOpenModalAddMember(false)}
                        >
                            Hủy
                        </Button>,
                        <Button
                            htmlType="submit"
                            key="submit"
                            type="primary"
                            form="add-member-to-group"
                        >
                            Xác nhận
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        name="add-member-to-group"
                        id="add-member-to-group"
                        layout="vertical"
                        // onFinish={handleCancelTour}
                    >
                        <Form.Item
                            name="member"
                            label="Tên thành viên"
                            rules={[
                                {
                                    required: true,
                                    message: `Vui lòng điền tên thành viên`,
                                },
                            ]}
                        >
                            <Input placeholder="Tên thành viên" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
);

ChatSection.displayName = 'Chat Section';

export default ChatSection;
