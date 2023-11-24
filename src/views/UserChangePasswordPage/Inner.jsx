import { memo, useEffect } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import UserActivityLayout from 'layouts/UserActivityLayout';
import { Button } from 'antd';
import Title from 'components/Title';
import ChangePasswordItem from 'components/ChangePasswordItem';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Đổi mật khẩu';
    });
    return (
        <UserActivityLayout>
            <div className="change-password">
                <Title title="Thay đổi mật khẩu" />
                <div className="change-password__content">
                    <div className="change-password__content--item">
                        <ChangePasswordItem title="Mật khẩu hiện tại" />
                    </div>
                    <div className="change-password__content--item">
                        <ChangePasswordItem title="Mật khẩu mới" />
                    </div>
                    <div className="change-password__content--item">
                        <ChangePasswordItem title="Xác nhận mật khẩu" />
                    </div>
                </div>
                <div className="change-password__footer">
                    <Button
                        type="primary"
                        icon={<CheckCircleFilled />}
                        size="large"
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </UserActivityLayout>
    );
});

Inner.displayName = 'User Change Password Inner';

export default Inner;
