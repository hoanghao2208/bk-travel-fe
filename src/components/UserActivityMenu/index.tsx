import {
    HeartOutlined,
    LogoutOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
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
            getItem('Thông tin thanh toán', 'pay-info'),
            getItem('Đơn hàng', 'orders'),
        ]),
        getItem('Đánh giá', 'evaluate', <StarOutlined />),
        getItem('Mục yêu thích', 'wishlist', <HeartOutlined />),
        getItem('Đăng xuất', 'log-out', <LogoutOutlined />),
    ];

    const handleClick: MenuProps['onClick'] = e => {
        navigate('/' + e.key);
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
