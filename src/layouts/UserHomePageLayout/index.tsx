import { FC, PropsWithChildren } from 'react';
import './styles.scss';
import UserHeader from 'components/UserHeader';
import UserFooter from 'components/UserFooter';

const UserHomePageLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <UserHeader />
            <div className="user-homepage__wrapper">{children}</div>
            <UserFooter />
        </>
    );
};

export default UserHomePageLayout;
