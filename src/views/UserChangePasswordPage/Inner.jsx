import { memo, useEffect } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import UserActivityLayout from 'layouts/UserActivityLayout';
import { Button, Form, Input } from 'antd';
import Title from 'components/Title';
import Message from 'components/Message';
import './style.scss';

const Inner = memo(({ form, handleChangePassword }) => {
    useEffect(() => {
        document.title = 'Đổi mật khẩu';
    });

    const handleSubmitChangePassword = values => {
        const { new_password, confirm_password, old_password } = values;

        if (new_password !== confirm_password) {
            Message.sendError(
                'Mật khẩu mới và Xác nhận mật khẩu phải trùng khớp',
                4
            );
            return;
        }

        if (
            old_password === new_password &&
            old_password === confirm_password
        ) {
            Message.sendError(
                'Mật khẩu mới không được trùng với Mật khẩu cũ',
                4
            );
            return;
        }

        handleChangePassword(values);
    };

    return (
        <UserActivityLayout>
            <div className="change-password">
                <Title title="Thay đổi mật khẩu" />
                <div className="change-password__content">
                    <Form
                        form={form}
                        name="change-password"
                        onFinish={handleSubmitChangePassword}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Mật khẩu cũ"
                            name="old_password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng nhập mật khẩu cũ của bạn',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Mật khẩu cũ" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="new_password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng nhập mật khẩu mới của bạn',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Mật khẩu mới" />
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu mới"
                            name="confirm_password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận mật khẩu mới',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu" />
                        </Form.Item>

                        <Form.Item>
                            <div className="change-password__footer">
                                <Button
                                    type="primary"
                                    icon={<CheckCircleFilled />}
                                    size="large"
                                    htmlType="submit"
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </UserActivityLayout>
    );
});

Inner.displayName = 'User Change Password Inner';

export default Inner;
