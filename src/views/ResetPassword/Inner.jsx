import { Button, Form, Input } from 'antd';
import LogoRegister from 'assets/icons/LogoRegister';
import Message from 'components/Message';
import RegisterLayout from 'layouts/RegisterLayout';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import { PASSWORD_VALIDATE } from 'utils/constants';
import './styles.scss';

const Inner = memo(({ loading, handleResetPassword }) => {
    useEffect(() => {
        document.title = 'Cập nhật mật khẩu';
    });

    const handleSubmitReset = value => {
        const { new_password, confirm_password } = value;
        if (new_password !== confirm_password) {
            Message.sendError(
                'Mật khẩu mới và xác nhận mật khẩu không trùng khớp',
                4
            );
        } else {
            handleResetPassword(value);
        }
    };

    return (
        <div className="forgot-wrapper">
            <RegisterLayout>
                <div className="forgot-header">
                    <div className="forgot-header__header">
                        <LogoRegister />
                        <span className="forgot-header__header--title">
                            Cập nhật mật khẩu
                        </span>
                    </div>
                    <span className="forgot-header__intro">
                        Vui lòng cập nhật mật khẩu của bạn
                    </span>
                </div>
                <div className="forgot__form">
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        layout="vertical"
                        onFinish={handleSubmitReset}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Mã xác nhận"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng cung cấp mã xác nhận trong email của bạn',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Mã xác nhận"
                                disabled={loading}
                            />
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
                                {
                                    pattern: PASSWORD_VALIDATE,
                                    message:
                                        'Mật khẩu tổi thiểu 8 ký tự, ít nhất 1 ký tự và 1 số.',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="Mật khẩu mới"
                                disabled={loading}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirm_password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng xác nhận mật khẩu của bạn',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="Xác nhận mật khẩu"
                                disabled={loading}
                            />
                        </Form.Item>
                        <div className="forgot__form--footer">
                            <span>
                                Chưa có tài khoản?
                                <Link to={routeConstants.REGISTER}>
                                    Đăng ký
                                </Link>
                            </span>
                            <Link to={routeConstants.LOGIN}>Đăng nhập</Link>
                        </div>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={loading}
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </RegisterLayout>
        </div>
    );
});

Inner.displayName = 'Reset Password Inner';

export default Inner;
