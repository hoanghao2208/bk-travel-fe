import { Button, Form, Input } from 'antd';
import RegisterHeader from 'components/RegisterHeader';
import RegisterLayout from 'layouts/RegisterLayout';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EMAIL_VALIDATE } from 'utils/constants';
import './styles.scss';

const Inner = memo(({ handleLogin, loading }) => {
    useEffect(() => {
        document.title = 'Đăng nhập';
    });
    const handleSubmitLogin = values => {
        handleLogin(values);
    };
    return (
        <div className="login-wrapper">
            <RegisterLayout>
                <RegisterHeader title="Đăng nhập" />
                <div className="login__form">
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        layout="vertical"
                        onFinish={handleSubmitLogin}
                        autoComplete="off"
                    >
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
                                    message: 'Vui lòng nhập mật khẩu của bạn',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>
                        <div className="login__form--footer">
                            <span>
                                Chưa có tài khoản?
                                <Link to="/register">Đăng ký</Link>
                            </span>
                            <Link to="/forgot-password">Quên mật khẩu?</Link>
                        </div>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={loading}
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </RegisterLayout>
        </div>
    );
});

Inner.displayName = 'Login Inner';

export default Inner;
