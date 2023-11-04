import { Button, Form, Input } from 'antd';
import FacebookIcon from 'assets/icons/FacebookIcon';
import GoogleIcon from 'assets/icons/GoogleIcon';
import LogoRegister from 'assets/icons/LogoRegister';
import SocialIcon from 'components/SocialIcon';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Đăng ký';
    });
    return (
        <div className="register">
            <div className="register__wrapper">
                <div className="register__container">
                    <div className="register__header">
                        <LogoRegister />
                        <span className="register__header--title">Đăng ký</span>
                    </div>
                    <span className="register__intro">
                        Vui lòng điền các thông tin bên dưới
                    </span>
                    <div className="register__social">
                        <SocialIcon icon={<GoogleIcon />} iconName="Google" />
                        <SocialIcon
                            icon={<FacebookIcon />}
                            iconName="Facebook"
                        />
                    </div>
                    <div className="register__or">hoặc</div>
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
                                            message:
                                                'Please input your username!',
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
                                            message:
                                                'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Tên" />
                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Tên đăng nhập"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder="Tên đăng nhập" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
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
                                        message: 'Please input your username!',
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
                                        message: 'Please input your username!',
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
                                <Link to="/forgot-password">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
});

Inner.displayName = 'Register Inner';

export default Inner;
