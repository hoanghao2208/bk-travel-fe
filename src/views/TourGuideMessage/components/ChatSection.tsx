import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Tooltip } from 'antd';
import { FC, memo, useState } from 'react';
import MessageItem from 'views/Message/components/MessageItem';
import '../style.scss';

interface ChatSectionProps {
    name?: string;
    activeGrp?: number;
    socket?: any;
}

const ChatSection: FC<ChatSectionProps> = memo(
    ({ name, activeGrp, socket }) => {
        const [openModalAddMember, setOpenModalAddMember] = useState(false);

        const [form] = Form.useForm();

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
                            Group số 1
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
                <div className="chat-sections--content">
                    <MessageItem messId={1} content="Dương Hoàng Hảo" time="" />
                </div>
                <div className="chat-sections--footer">
                    <div className="chat-sections--footer--wrapper">
                        <Input
                            placeholder="Nhập tin nhắn của bạn tại đây"
                            // value={contentMessage}
                            // onChange={getContentMessage}
                            // onPressEnter={handleSendMessage}
                        />
                        <Tooltip placement="top" title="Gửi tin nhắn">
                            <Button icon={<SendOutlined />} type="link" />
                        </Tooltip>
                    </div>
                </div>
                <Modal
                    title="Thêm thành viên"
                    open={openModalAddMember}
                    // onOk={handleOk}
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
