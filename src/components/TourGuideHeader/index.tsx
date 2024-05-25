import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Tooltip } from 'antd';
import BellNotifyIcon from 'assets/icons/BellNotifyIcon';
import LogOutIcon from 'assets/icons/LogOutIcon';
import Logo from 'assets/icons/Logo';
import MessageIcon from 'assets/icons/MessageIcon';
import UserDropDown from 'assets/icons/UserDropDown';
import Message from 'components/Message';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenActions } from 'reducers/token';
import routeConstants from 'route/routeConstant';
import { dispatch } from 'store/Store';
import './styles.scss';

const TourGuideHeader: FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(tokenActions.SET_ACCESS_TOKEN(''));
        dispatch(tokenActions.SET_USER_ID(0));
        Message.sendSuccess('Đăng xuất thành công');
    };

    const items = [
        {
            key: '1',
            label: (
                <Link
                    to={routeConstants.USER_PROFILE}
                    style={{
                        fontSize: '16px',
                        display: 'inline-block',
                        paddingLeft: '10px',
                    }}
                >
                    Thông tin cá nhân
                </Link>
            ),
            icon: <UserDropDown />,
        },
        {
            key: '2',
            danger: true,
            label: (
                <Link
                    to="/"
                    style={{
                        fontSize: '16px',
                        display: 'inline-block',
                        paddingLeft: '10px',
                    }}
                    onClick={handleLogout}
                >
                    Đăng xuất
                </Link>
            ),
            icon: <LogOutIcon />,
        },
    ];
    return (
        <div className="user-login-header__wrapper">
            <div className="user-login-header">
                <div className="user-login-header__logo">
                    <Link to={routeConstants.TOURGUIDE_HOMEPAGE}>
                        <Logo />
                    </Link>
                </div>
                <div className="user-login-header__navigate">
                    <Link to={routeConstants.TOURGUIDE_MISSION}>Nhiệm vụ</Link>
                    <Link to={routeConstants.WEATHER_FORECAST}>Thời tiết</Link>
                    <div
                        onClick={() =>
                            navigate(routeConstants.TOURGUIDE_MESSAGE)
                        }
                        className="user-login-header__navigate--bell"
                    >
                        <Tooltip placement="top" title="Tin nhắn">
                            <MessageIcon />
                        </Tooltip>
                    </div>
                    <div className="user-login-header__navigate--avatar">
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow
                        >
                            <Avatar
                                size={44}
                                icon={<UserOutlined />}
                                src={null}
                            />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourGuideHeader;
