import { memo, useEffect, useRef } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import { InboxOutlined, CompassFilled } from '@ant-design/icons';
import { Form, Input, Select, Upload, Button } from 'antd';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Gửi thông báo';
    });
    const formRef = useRef(null);

    return (
        <AdminLayout>
            <div className="admin-notification">
                <div className="admin-notification__header">
                    <h1 className="admin-notification__header--title">
                        gửi thông báo
                    </h1>
                    <p className="admin-notification__header--intro">
                        Vui lòng điền các thông tin bên dưới để có thể hoàn tất
                        việc gửi thông báo của bạn.
                    </p>
                </div>
                <div className="admin-notification__content">
                    <Form
                        ref={formRef}
                        name="notification"
                        layout="vertical"
                        // onFinish={onFinish}
                    >
                        <div className="admin-notification__content-inf1">
                            <div className="admin-notification__content-inf1--item1">
                                <Form.Item
                                    label="Tiêu đề thông báo"
                                    name="title_notice"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tiêu đề của thông báo',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Tiêu đề thông báo" />
                                </Form.Item>
                            </div>
                            <div className="admin-notification__content-inf1--item">
                                <Form.Item
                                    label="Gửi thông báo tới"
                                    name="receiver"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn người nhận',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Người nhận">
                                        <Option value="tourguide">
                                            Hướng dẫn viên
                                        </Option>
                                        <Option value="user">
                                            Khách du lịch
                                        </Option>
                                        <Option value="all-user">Cả hai</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="admin-notification__content-inf1--item">
                                <Form.Item
                                    label="Loại thông báo"
                                    name="notice-type"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn loại thông báo',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Loại thông báo">
                                        <Option value="kehoach">
                                            Kế hoạch
                                        </Option>
                                        <Option value="notice">
                                            Thông báo
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="admin-notification__content-inf2">
                            <Form.Item
                                name="content"
                                label="Nội dung thông báo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập nội dung',
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Nội dung thông báo"
                                    style={{ height: 120 }}
                                />
                            </Form.Item>
                        </div>
                        <div className="admin-notification__content-inf1">
                            <div className="admin-notification__content-inf1--item1">
                                <Form.Item label="File đính kèm" name="file">
                                    <Upload.Dragger
                                        listType="picture-card"
                                        // fileList={fileList}
                                        // onChange={handleUpload}
                                        beforeUpload={() => false}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Chọn file đính kèm
                                        </p>
                                    </Upload.Dragger>
                                </Form.Item>
                                <p className="img-validate">
                                    Định dạng JPG, PNG, JPEG, PDF
                                </p>
                            </div>
                        </div>
                        <div className="admin-notification__content-btn">
                            <Button
                                type="primary"
                                shape="round"
                                icon={<CompassFilled />}
                                size="large"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Notification Inner';

export default Inner;
