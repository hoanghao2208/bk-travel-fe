import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import LogOutIcon from 'assets/icons/LogOutIcon';
import Message from 'components/Message';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setCustomerId, setToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import './styles.scss';

const AdminHeader: FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken('');
        setCustomerId(0);
        navigate(routeConstants.USER_HOME_PAGE);
        Message.sendSuccess('Đăng xuất thành công');
        window.location.reload();
    };

    const items = [
        {
            key: '1',
            danger: true,
            label: (
                <Link
                    to="/log-out"
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
        <div className="admin-header__wrapper">
            <div className="admin-header">
                <div className="admin-header__navigate">
                    <div className="admin-header__navigate--avatar">
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

export default AdminHeader;
