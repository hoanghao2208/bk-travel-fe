import { FC } from 'react';
import './styles.scss';
import Logo from 'assets/icons/Logo';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import LinkedInFooterIcon from 'assets/icons/LinkedInFooterIcon';
import FacebookFooterIcon from 'assets/icons/FacebookFooterIcon';
import InstagramFooterIcon from 'assets/icons/InstagramFooterIcon';
import YoutubeFooterIcon from 'assets/icons/YoutubeFooterIcon';

const UserFooter: FC = () => {
    return (
        <div className="user-footer">
            <div className="user-footer__top">
                <p className="user-footer__top--intro">Vì sự an toàn của bạn</p>
                <h1 className="user-footer__top--title">
                    Để biết thêm thông tin về chúng tôi
                </h1>
                <p className="user-footer__top--slogan">
                    Chúng tôi tin rằng mỗi chuyến đi là một cơ hội để bạn có thể
                    khám phá bản thân và kết nối với thế giới xung quanh
                </p>
                <div className="user-footer__top--button">
                    <Button type="primary">Liên hệ</Button>
                </div>
                <p className="user-footer__top--license">
                    &copy; 2023 BK Travel. All Rights Reserved.
                </p>
            </div>
            <div className="user-footer__bottom">
                <div className="user-footer__bottom--logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="user-footer__bottom--navigate">
                    <Link to="/rules">Điều khoản</Link>
                    <Link to="/policy">Chính sách</Link>
                    <Link to="/infomation">Thông tin liên hệ</Link>
                </div>
                <div className="user-footer__bottom--social">
                    <div className="user-footer__bottom--social-item">
                        <LinkedInFooterIcon />
                    </div>
                    <div className="user-footer__bottom--social-item">
                        <FacebookFooterIcon />
                    </div>
                    <div className="user-footer__bottom--social-item">
                        <InstagramFooterIcon />
                    </div>
                    <div className="user-footer__bottom--social-item">
                        <YoutubeFooterIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFooter;
