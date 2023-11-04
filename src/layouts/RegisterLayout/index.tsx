import { FC, PropsWithChildren } from 'react';
import './styles.scss';

const RegisterLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="register-layout">
            <div className="register-layout__wrapper">
                <div className="register-layout__container">{children}</div>
            </div>
        </div>
    );
};

export default RegisterLayout;
