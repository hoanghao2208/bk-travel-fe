import { FC, PropsWithChildren } from 'react';
import './styles.scss';
import UserHeader from 'components/UserHeader';
import UserLoginHeader from 'components/UserLoginHeader';
import UserFooter from 'components/UserFooter';
import { getToken } from 'reducers/token/function';

const UserHomePageLayout: FC<PropsWithChildren> = ({ children }) => {
    const token = getToken();
    return (
        <>
            {token === '' ? <UserHeader /> : <UserLoginHeader />}
            <div className="user-homepage__wrapper">{children}</div>
            <UserFooter />
        </>
    );
};

export default UserHomePageLayout;
