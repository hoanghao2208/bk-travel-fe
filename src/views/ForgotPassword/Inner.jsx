import { Button, Form, Input } from 'antd';
import LogoRegister from 'assets/icons/LogoRegister';
import RegisterLayout from 'layouts/RegisterLayout';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Inner = memo(() => {
    return (
        <div className="forgot-wrapper">
            <RegisterLayout>
                <div className='forgot-header'>
                    <div className="forgot-header__header">
                        <LogoRegister />
                        <span className="forgot-header__header--title">
                            Quên mật khẩu
                        </span>
                    </div>
                    <span className="forgot-header__intro">
                        Nhập email của bạn để có thể Đặt lại mật khẩu
                    </span>
                </div>
                <div className="forgot__form">
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
                            <Input placeholder="Emal" />
                        </Form.Item>
                        <div className="forgot__form--footer">
                            <span>
                                Chưa có tài khoản?
                                <Link to="/register">Đăng ký</Link>
                            </span>
                            <Link to="/login">Đăng nhập</Link>
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </RegisterLayout>
        </div>
    );
});

Inner.displayName = 'Forgot Password Inner';

export default Inner;
