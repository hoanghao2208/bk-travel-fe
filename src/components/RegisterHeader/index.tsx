import FacebookIcon from 'assets/icons/FacebookIcon';
import GoogleIcon from 'assets/icons/GoogleIcon';
import LogoRegister from 'assets/icons/LogoRegister';
import SocialIcon from 'components/SocialIcon';
import { FC } from 'react';
import './styles.scss';

interface RegisterHeaderProps {
    title: string;
}

const RegisterHeader: FC<RegisterHeaderProps> = ({ title }) => {
    return (
        <>
            <div className="register-header__header">
                <LogoRegister />
                <span className="register-header__header--title">{title}</span>
            </div>
            <span className="register-header__intro">
                Vui lòng điền các thông tin bên dưới
            </span>
            <div className="register-header__social">
                <SocialIcon icon={<GoogleIcon />} iconName="Google" />
                <SocialIcon icon={<FacebookIcon />} iconName="Facebook" />
            </div>
            <div className="register-header__or">hoặc</div>
        </>
    );
};

export default RegisterHeader;
