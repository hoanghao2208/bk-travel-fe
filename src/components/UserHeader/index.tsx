import { Button, Input } from 'antd';
import Logo from 'assets/icons/Logo';
import SearchIcon from 'assets/icons/SearchIcon';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import './styles.scss';

const UserHeader: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="user-header__wrapper">
            <div className="user-header">
                <div className="user-header__logo">
                    <Link to={routeConstants.USER_HOME_PAGE}>
                        <Logo />
                    </Link>
                </div>
                <div className="user-header__search">
                    <Input
                        placeholder="Tìm kiếm điểm đến, hoạt động ..."
                        prefix={<SearchIcon />}
                    />
                </div>
                <div className="user-header__navigate">
                    <Link to="/top-tour">Tour nổi bật</Link>
                    <Link to="/weather-forecast">Thời tiết</Link>
                    <Link to="/support">Trợ giúp</Link>
                    <Link to={routeConstants.REGISTER}>Đăng ký</Link>
                    <Button
                        type="primary"
                        ghost
                        onClick={() => navigate(routeConstants.LOGIN)}
                    >
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;
