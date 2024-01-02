import { Button, Form, Input } from 'antd';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import RegisterHeader from 'components/RegisterHeader';
import RegisterLayout from 'layouts/RegisterLayout';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Đăng ký';
    });
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
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="register__form--name">
                        <Form.Item
                            label="Họ"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Họ của bạn',
                                },
                            ]}
                        >
                            <Input placeholder="Họ" />
                        </Form.Item>

                        <Form.Item
                            label="Tên"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên của bạn',
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
                        ]}
                    >
                        <Input placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu',
                            },
                        ]}
                    >
                        <Input placeholder="Xác nhận mật khẩu" />
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
