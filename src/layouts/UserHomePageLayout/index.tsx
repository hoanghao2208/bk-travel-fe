import UserFooter from 'components/UserFooter';
import UserHeader from 'components/UserHeader';
import UserLoginHeader from 'components/UserLoginHeader';
import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { profileActions } from 'reducers/profile';
import { getCustomerId, getToken } from 'reducers/token/function';
import userService from 'services/userService';
import { dispatch } from 'store/Store';
import './styles.scss';

const UserHomePageLayout: FC<PropsWithChildren> = ({ children }) => {
    const token = getToken();
    const userId = getCustomerId();

    const getUserInfor = useCallback(async () => {
        try {
            if (userId === 0) {
                return;
            }
            const response = await userService.getUserInfo(userId);
            if (response?.status === 200) {
                dispatch(profileActions.SET_PROFILE(response.data.user_info));
            }
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    useEffect(() => {
        getUserInfor();
    }, [getUserInfor]);

    return (
        <>
            {token === '' ? <UserHeader /> : <UserLoginHeader />}
            <div className="user-homepage__wrapper">{children}</div>
            <UserFooter />
        </>
    );
};

export default UserHomePageLayout;
