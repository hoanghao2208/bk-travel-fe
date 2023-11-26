import React, { FC } from 'react';
import './styles.scss';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
    AppstoreOutlined,
    UserAddOutlined,
    CloudUploadOutlined,
    FolderOpenOutlined,
    CloudOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminMenu: FC = () => {
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
            [getItem('Quản lý tour', '1', <AppstoreOutlined />)],
            'group'
        ),
        getItem(
            'QUẢN LÝ HƯỚNG DẪN VIÊN',
            'manage-tour-guide',
            null,
            [
                getItem('Quản lý hướng dẫn viên', '2', <AppstoreOutlined />),
                getItem('Giao nhiệm vụ', '3', <UserAddOutlined />),
            ],
            'group'
        ),
        getItem(
            'QUẢN LÝ DU KHÁCH',
            'manage-user',
            null,
            [getItem('Quản lý du khách', '4', <AppstoreOutlined />)],
            'group'
        ),
        getItem(
            'THÔNG BÁO',
            'inform',
            null,
            [
                getItem('Gửi thông báo', '5', <CloudUploadOutlined />),
                getItem('Quản lý thông báo', '6', <FolderOpenOutlined />),
            ],
            'group'
        ),
        getItem(
            'THỜI TIẾT',
            'weather',
            null,
            [getItem('Theo dõi thời tiết', '7', <CloudOutlined />)],
            'group'
        ),
    ];
    // const onClick: MenuProps['onClick'] = e => {
    //     console.log('click ', e);
    // };
    return (
        <div className="admin-menu">
            <div className="admin-menu--home">
                <Link to="/admin">BK - Travel</Link>
            </div>
            <div className="admin-menu--navigate">
                <Menu
                    // onClick={onClick}
                    style={{ width: 288 }}
                    mode="inline"
                    items={items}
                />
            </div>
        </div>
    );
};

export default AdminMenu;
