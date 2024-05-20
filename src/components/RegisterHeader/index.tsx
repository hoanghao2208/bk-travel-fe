import LogoRegister from 'assets/icons/LogoRegister';
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
        </>
    );
};

export default RegisterHeader;
