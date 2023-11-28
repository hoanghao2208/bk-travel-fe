import { FC, useState } from 'react';
import './styles.scss';
import { Avatar, Badge, Dropdown, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SearchIcon from 'assets/icons/SearchIcon';
import BellNotifyIcon from 'assets/icons/BellNotifyIcon';
import UserDropDown from 'assets/icons/UserDropDown';
import LogOutIcon from 'assets/icons/LogOutIcon';
import { Link } from 'react-router-dom';

const AdminHeader: FC = () => {
    const [hoverBell, setHoverBell] = useState<boolean>(false);
    const handleMouseEnterBell = () => {
        setHoverBell(true);
    };
    const handleMouseLeaveBell = () => {
        setHoverBell(false);
    };
    const items = [
        {
            key: '1',
            label: (
                <Link
                    to="/user-info"
                    style={{
                        fontSize: '18px',
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
                    to="/log-out"
                    style={{
                        fontSize: '18px',
                        display: 'inline-block',
                        paddingLeft: '10px',
                    }}
                >
                    Đăng xuất
                </Link>
            ),
            icon: <LogOutIcon />,
        },
    ];

    return (
        <div className="admin-header__wrapper">
            <div className="admin-header">
                <div className="admin-header__search">
                    <Input placeholder="Tìm kiếm ..." prefix={<SearchIcon />} />
                </div>
                <div className="admin-header__navigate">
                    <div
                        onMouseEnter={handleMouseEnterBell}
                        onMouseLeave={handleMouseLeaveBell}
                        className="admin-header__navigate--bell"
                    >
                        <Badge count={8} overflowCount={10}>
                            <BellNotifyIcon hoverBell={hoverBell} />
                        </Badge>
                    </div>
                    <div className="admin-header__navigate--avatar">
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow
                        >
                            <Avatar size={48} icon={<UserOutlined />} />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
