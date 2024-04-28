import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Input } from 'antd';
import BellNotifyIcon from 'assets/icons/BellNotifyIcon';
import CartIcon from 'assets/icons/CartIcon';
import HeartDropDown from 'assets/icons/HeartDropDown';
import LogOutIcon from 'assets/icons/LogOutIcon';
import Logo from 'assets/icons/Logo';
import MoneyDropDown from 'assets/icons/MoneyDropDown';
import SearchIcon from 'assets/icons/SearchIcon';
import UserDropDown from 'assets/icons/UserDropDown';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    getCustomerId,
    setCustomerId,
    setToken,
} from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
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
    const [cartNumber, setCartNumber] = useState(0);

    const user_id = getCustomerId();

    const handleGetUserInfo = useCallback(async () => {
        try {
            const response = await userService.getUserInfo(user_id);
            if (response?.status === 200) {
                setUserInfo(response?.data.user_info);
            }
        } catch (err) {
            console.error(err);
        }
    }, [user_id]);

    const handleGetCartCount = useCallback(async () => {
        const response = await userService.getCartByUser(user_id);
        if (response?.status === 200) {
            if (
                response?.data.data !== null &&
                response?.data.data.cart !== null
            ) {
                const orderItems = response?.data.data.cart.order_items;
                setCartNumber(orderItems?.length);
            }
        }
    }, [user_id]);

    const handleLogout = () => {
        setToken('');
        setCustomerId(0);
        navigate(routeConstants.USER_HOME_PAGE);
        window.location.reload();
    };

    useEffect(() => {
        handleGetUserInfo();
    }, [handleGetUserInfo]);

    useEffect(() => {
        handleGetCartCount();
    }, [handleGetCartCount]);

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
                    to="/orders"
                    style={{
                        fontSize: '16px',
                        display: 'inline-block',
                        paddingLeft: '10px',
                    }}
                >
                    Đơn hàng của bạn
                </Link>
            ),
            icon: <MoneyDropDown />,
        },
        {
            key: '3',
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
            key: '4',
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
                <div className="user-login-header__search">
                    <Input
                        placeholder="Tìm kiếm điểm đến, hoạt động ..."
                        prefix={<SearchIcon />}
                    />
                </div>
                <div className="user-login-header__navigate">
                    <Link to={routeConstants.USER_LIST_CUSTOM_TOURS}>
                        Tour đề xuất
                    </Link>
                    <Link to="/voucher">Ưu đãi</Link>
                    <Link to={routeConstants.WEATHER_FORECAST}>Thời tiết</Link>
                    <div
                        onClick={() => navigate('/')}
                        className="user-login-header__navigate--bell"
                    >
                        <Badge count={8} overflowCount={10}>
                            <BellNotifyIcon />
                        </Badge>
                    </div>
                    <div
                        onClick={() => navigate(routeConstants.CART)}
                        className="user-login-header__navigate--cart"
                    >
                        <Badge count={cartNumber} overflowCount={9}>
                            <CartIcon />
                        </Badge>
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
