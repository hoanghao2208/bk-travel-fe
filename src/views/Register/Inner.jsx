import { Button, Form, Input } from 'antd';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import RegisterHeader from 'components/RegisterHeader';
import RegisterLayout from 'layouts/RegisterLayout';
import { EMAIL_VALIDATE, PASSWORD_VALIDATE } from 'utils/constants';
import Message from 'components/Message';

const Inner = memo(({ handleRegister }) => {
    useEffect(() => {
        document.title = 'Đăng ký';
    });

    const handleSubmitRegister = values => {
        const { password, confirm_password } = values;
        if (password !== confirm_password) {
            Message.sendError('Xác nhận mật khẩu không trùng khớp', 4);
        } else {
            handleRegister(values);
        }
    };

    return (
        <RegisterLayout>
            <RegisterHeader title="Đăng ký" />
            <div className="register__form">
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                    onFinish={handleSubmitRegister}
                    autoComplete="off"
                >
                    <div className="register__form--name">
                        <Form.Item
                            label="Họ"
                            name="firstname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Họ của bạn',
                                },
                                {
                                    max: 10,
                                    message: 'Số ký tự quá lớn',
                                },
                            ]}
                        >
                            <Input placeholder="Họ" />
                        </Form.Item>

                        <Form.Item
                            label="Tên"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên của bạn',
                                },
                                {
                                    max: 32,
                                    message: 'Số ký tự quá lớn',
                                },
                            ]}
                        >
                            <Input placeholder="Tên" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email của bạn',
                            },
                            {
                                pattern: EMAIL_VALIDATE,
                                message: 'Email của bạn không hợp lệ',
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu',
                            },
                            {
                                pattern: PASSWORD_VALIDATE,
                                message:
                                    'Mật khẩu tổi thiểu 8 ký tự, ít nhất 1 ký tự và 1 số.',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirm_password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Xác nhận mật khẩu" />
                    </Form.Item>
                    <div className="register__form--footer">
                        <span>
                            Đã có tài khoản?
                            <Link to="/login">Đăng nhập</Link>
                        </span>
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </RegisterLayout>
    );
});

Inner.displayName = 'Register Inner';

export default Inner;
