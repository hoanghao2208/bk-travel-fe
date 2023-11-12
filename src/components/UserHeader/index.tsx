import { FC } from "react";
import './styles.scss';
import Logo from "assets/icons/Logo";
import { Button, Input } from "antd";
import SearchIcon from "assets/icons/SearchIcon";
import { Link, useNavigate } from "react-router-dom";

const UserHeader: FC = () => {
    const navigate = useNavigate();
    return(
        <div className="user-header">
            <div className="user-header__logo">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="user-header__search">
                <Input placeholder="Tìm kiếm điểm đến, hoạt động ..." prefix={<SearchIcon />} />
            </div>
            <div className="user-header__navigate">
                <Link to="/top-tour">
                    Tour nổi bật
                </Link>
                <Link to="/weather-forcast">
                    Thời tiết
                </Link>
                <Link to="/support">
                    Trợ giúp
                </Link>
                <Link to="/register">
                    Đăng ký
                </Link>
                <Button type="primary" ghost onClick={() => navigate('/login')}>
                    Đăng nhập
                </Button>
            </div>
        </div>
    )
}

export default UserHeader;