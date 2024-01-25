import { FC, useState } from 'react';
import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'assets/icons/Logo';
import SearchIcon from 'assets/icons/SearchIcon';
import { Avatar, Badge, Dropdown, Input } from 'antd';
import CartIcon from 'assets/icons/CartIcon';
import BellNotifyIcon from 'assets/icons/BellNotifyIcon';
import { UserOutlined } from '@ant-design/icons';
import UserDropDown from 'assets/icons/UserDropDown';
import MoneyDropDown from 'assets/icons/MoneyDropDown';
import HeartDropDown from 'assets/icons/HeartDropDown';
import LogOutIcon from 'assets/icons/LogOutIcon';
import Message from 'components/Message';
import { setToken } from 'reducers/token/function';

const UserLoginHeader: FC = () => {
    const navigate = useNavigate();
    const [hoverBell, setHoverBell] = useState(false);
    const [hoverCart, setHoverCart] = useState(false);
    const handleMouseEnterBell = () => {
        setHoverBell(true);
    };
    const handleMouseLeaveBell = () => {
        setHoverBell(false);
    };
    const handleMouseEnterCart = () => {
        setHoverCart(true);
    };
    const handleMouseLeaveCart = () => {
        setHoverCart(false);
    };

    const handleLogout = () => {
        setToken('');
        window.location.reload();
        navigate('/');
        Message.sendSuccess('Đăng xuất thành công');
    };

    const items = [
        {
            key: '1',
            label: (
                <Link
                    to="/user-profile"
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
                    to="/how-to-pay"
                    style={{
                        fontSize: '16px',
                        display: 'inline-block',
                        paddingLeft: '10px',
                    }}
                >
                    Thông tin thanh toán
                </Link>
            ),
            icon: <MoneyDropDown />,
        },
        {
            key: '3',
            label: (
                <Link
                    to="/likes"
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
                    <Link to="/">
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
                    <Link to="/top-tour">Tour nổi bật</Link>
                    <Link to="/voucher">Ưu đãi</Link>
                    <Link to="/weather-forecast">Thời tiết</Link>
                    <div
                        onClick={() => navigate('/')}
                        onMouseEnter={handleMouseEnterBell}
                        onMouseLeave={handleMouseLeaveBell}
                        className="user-login-header__navigate--bell"
                    >
                        <Badge count={8} overflowCount={10}>
                            <BellNotifyIcon hoverBell={hoverBell} />
                        </Badge>
                    </div>
                    <div
                        onClick={() => navigate('/cart')}
                        onMouseEnter={handleMouseEnterCart}
                        onMouseLeave={handleMouseLeaveCart}
                        className="user-login-header__navigate--cart"
                    >
                        <Badge count={9} overflowCount={9}>
                            <CartIcon hoverCart={hoverCart} />
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
                            <Avatar size={40} icon={<UserOutlined />} />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLoginHeader;
