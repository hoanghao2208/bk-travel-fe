import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Tooltip } from 'antd';
import CanceledIcon from 'assets/icons/CanceledIcon';
import CartIcon from 'assets/icons/CartIcon';
import HeartDropDown from 'assets/icons/HeartDropDown';
import LogOutIcon from 'assets/icons/LogOutIcon';
import Logo from 'assets/icons/Logo';
import MessageIcon from 'assets/icons/MessageIcon';
import MoneyDropDown from 'assets/icons/MoneyDropDown';
import UserDropDown from 'assets/icons/UserDropDown';
import Message from 'components/Message';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenActions } from 'reducers/token';
import { getCartCount, getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import { dispatch } from 'store/Store';
import './styles.scss';

interface UserInfo {
    avatar: string;
}

const defaultUserInfo: UserInfo = {
    avatar: '',
};

const UserLoginHeader: FC = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

    const cartNumber = getCartCount();

    const user_id = getCustomerId();
    const token = getToken();

    const handleGetUserInfo = useCallback(async () => {
        try {
            if (user_id === 0) {
                return;
            }
            const response = await userService.getUserInfo(user_id, token);
            if (response?.status === 200) {
                setUserInfo(response?.data.user_info);
            }
        } catch (err) {
            console.error(err);
        }
    }, [token, user_id]);

    const handleLogout = () => {
        dispatch(tokenActions.SET_ACCESS_TOKEN(''));
        dispatch(tokenActions.SET_USER_ID(0));
        Message.sendSuccess('Đăng xuất thành công');
    };

    useEffect(() => {
        handleGetUserInfo();
    }, [handleGetUserInfo]);

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
            label: (
                <Link
                    to={routeConstants.PENDING_ORDERS}
                    style={{
                        fontSize: '16px',
                        display: 'inline-block',
                        paddingLeft: '10px',
                    }}
                >
                    Đơn hàng chưa thanh toán
                </Link>
            ),
            icon: <MoneyDropDown />,
        },
        {
            key: '3',
            label: (
                <Link
                    to={routeConstants.CANCELED_ORDERS}
                    style={{
                        fontSize: '16px',
                        display: 'inline-block',
                        paddingLeft: '10px',
                    }}
                >
                    Đơn hàng đã hủy
                </Link>
            ),
            icon: <CanceledIcon />,
        },
        {
            key: '4',
            label: (
                <Link
                    to={routeConstants.LOVE_LIST}
                    style={{
                        fontSize: '16px',
                        display: 'inline-block',
                        paddingLeft: '10px',
                    }}
                >
                    Yêu thích
                </Link>
            ),
            icon: <HeartDropDown />,
        },
        {
            key: '5',
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
                    <Link to={routeConstants.USER_HOME_PAGE}>
                        <Logo />
                    </Link>
                </div>
                <div className="user-login-header__navigate">
                    <Link to={routeConstants.USER_LIST_CUSTOM_TOURS}>
                        Tour đề xuất
                    </Link>
                    <Link to={routeConstants.VOUCHER_LIST}>Ưu đãi</Link>
                    <Link to={routeConstants.USER_ORDERS}>
                        Đơn hàng của bạn
                    </Link>
                    <Link to={routeConstants.WEATHER_FORECAST}>Thời tiết</Link>
                    <div
                        onClick={() => navigate(routeConstants.MESSAGE)}
                        className="user-login-header__navigate--bell"
                    >
                        <Tooltip placement="top" title="Tin nhắn">
                            <MessageIcon />
                        </Tooltip>
                    </div>
                    <div
                        onClick={() => navigate(routeConstants.CART)}
                        className="user-login-header__navigate--cart"
                    >
                        <Tooltip placement="top" title="Giỏ hàng">
                            <Badge count={cartNumber} overflowCount={9}>
                                <CartIcon />
                            </Badge>
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
                                src={userInfo?.avatar ? userInfo.avatar : null}
                            />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLoginHeader;
