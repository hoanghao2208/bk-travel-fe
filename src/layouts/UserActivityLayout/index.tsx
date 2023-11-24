import UserActivityMenu from 'components/UserActivityMenu';
import UserFooter from 'components/UserFooter';
import UserLoginHeader from 'components/UserLoginHeader';
import { FC, PropsWithChildren, memo } from 'react';
import './styles.scss';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserActivityLayout: FC<PropsWithChildren> = memo(({ children }) => {
    return (
        <>
            <UserLoginHeader />
            <div className="user-activity-wrapper">
                <div className="user-activity">
                    <div className="user-activity__menu">
                        <div className="user-activity__menu--avt">
                            <Avatar size={116} icon={<UserOutlined />} />
                            <h3 className="user-activity__menu--name">
                                Dương Hoàng Hảo
                            </h3>
                            <p className="user-activity__menu--email">
                                hao.duonghaokhmt@hcmut.edu.com
                            </p>
                        </div>
                        <UserActivityMenu />
                    </div>
                    <div className="user-activity__children">{children}</div>
                </div>
            </div>
            <UserFooter />
        </>
    );
});

UserActivityLayout.displayName = 'User Activity Layout';

export default UserActivityLayout;
