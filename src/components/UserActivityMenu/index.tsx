import { HeartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenActions } from 'reducers/token';
import { dispatch } from 'store/Store';
import './styles.scss';

type MenuItem = Required<MenuProps>['items'][number];

const UserActivityMenu: FC = () => {
    const navigate = useNavigate();
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group'
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    const items = [
        getItem('Thông tin tải khoản', 'account-info', <UserOutlined />, [
            getItem('Thông tin cá nhân', 'user-profile'),
            getItem('Đổi mật khẩu', 'change-password'),
            getItem('Đơn hàng', 'orders'),
            getItem('Đơn hàng chưa thanh toán', 'pending-orders'),
        ]),
        getItem('Mục yêu thích', 'wishlist', <HeartOutlined />),
        getItem('Đăng xuất', 'log-out', <LogoutOutlined />),
    ];

    const handleClick: MenuProps['onClick'] = e => {
        if (e.key !== 'log-out') {
            navigate('/' + e.key);
        } else {
            dispatch(tokenActions.SET_ACCESS_TOKEN(''));
            dispatch(tokenActions.SET_USER_ID(0));
        }
    };
    return (
        <div className="user-actitvity-menu">
            <Menu
                defaultOpenKeys={['account-info']}
                mode="inline"
                items={items}
                onClick={handleClick}
            />
        </div>
    );
};

export default UserActivityMenu;
