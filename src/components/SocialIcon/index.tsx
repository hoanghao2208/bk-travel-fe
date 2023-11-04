import { FC, ReactNode } from 'react';
import './styles.scss';

interface SocialIconProps {
    icon: ReactNode;
    iconName: string;
}

const SocialIcon: FC<SocialIconProps> = ({ icon, iconName }) => {
    return (
        <div className="social-icon">
            <span className="social-icon__icon">{icon}</span>
            <span className="social-icon__name">{iconName}</span>
        </div>
    );
};

export default SocialIcon;
