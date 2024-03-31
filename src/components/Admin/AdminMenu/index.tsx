import {
    AppstoreOutlined,
    CloudOutlined,
    CloudUploadOutlined,
    FolderOpenOutlined,
    GiftOutlined,
    PlusOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import './styles.scss';

const AdminMenu: FC = () => {
    const navigate = useNavigate();
    type MenuItem = Required<MenuProps>['items'][number];
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
    const items: MenuProps['items'] = [
        getItem(
            'QUẢN LÝ TOURS',
            'manage-tour',
            null,
            [
                getItem(
                    'Quản lý tour',
                    'admin/manage-tours',
                    <AppstoreOutlined />
                ),
                getItem(
                    'Thêm tour mới',
                    'admin/add-new-tour',
                    <PlusOutlined />
                ),
            ],
            'group'
        ),
        getItem(
            'QUẢN LÝ HƯỚNG DẪN VIÊN',
            'manage-tour-guide',
            null,
            [
                getItem(
                    'Quản lý hướng dẫn viên',
                    'admin/manage-tour-guide',
                    <AppstoreOutlined />
                ),
                getItem(
                    'Giao nhiệm vụ',
                    'admin/assign-new-task',
                    <UserAddOutlined />
                ),
            ],
            'group'
        ),
        getItem(
            'QUẢN LÝ DU KHÁCH',
            'manage-user',
            null,
            [
                getItem(
                    'Quản lý du khách',
                    'admin/manage-tourist',
                    <AppstoreOutlined />
                ),
            ],
            'group'
        ),
        getItem(
            'Mã GIẢM GIÁ',
            'manage-voucher',
            null,
            [
                getItem(
                    'Quản lý Mã giảm giá',
                    'admin/manage-voucher',
                    <AppstoreOutlined />
                ),
                getItem(
                    'Thêm Mã giảm giá',
                    'admin/add-new-voucher',
                    <GiftOutlined />
                ),
            ],
            'group'
        ),
        getItem(
            'THÔNG BÁO',
            'inform',
            null,
            [
                getItem(
                    'Gửi thông báo',
                    'admin/notification',
                    <CloudUploadOutlined />
                ),
                getItem(
                    'Quản lý thông báo',
                    'admin/manage-notification',
                    <FolderOpenOutlined />
                ),
            ],
            'group'
        ),
        getItem(
            'THỜI TIẾT',
            'weather',
            null,
            [
                getItem(
                    'Theo dõi thời tiết',
                    'admin/weather-forecast',
                    <CloudOutlined />
                ),
            ],
            'group'
        ),
    ];
    const handleClick: MenuProps['onClick'] = e => {
        navigate('/' + e.key);
    };
    return (
        <div className="admin-menu">
            <div className="admin-menu--home">
                <Link to={routeConstants.ADMIN_HOMEPAGE}>BK - Travel</Link>
            </div>
            <div className="admin-menu--navigate">
                <Menu
                    onClick={handleClick}
                    style={{ width: 288 }}
                    mode="inline"
                    items={items}
                />
            </div>
        </div>
    );
};

export default AdminMenu;
