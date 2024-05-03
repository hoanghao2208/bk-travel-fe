import UserFooter from 'components/UserFooter';
import UserHeader from 'components/UserHeader';
import UserLoginHeader from 'components/UserLoginHeader';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileActions } from 'reducers/profile';
import { getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import { dispatch } from 'store/Store';
import './styles.scss';

interface DecodedToken extends JwtPayload {
    role_user: string;
}

const UserHomePageLayout: FC<PropsWithChildren> = ({ children }) => {
    const token = getToken();
    const userId = getCustomerId();

    const navigate = useNavigate();

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
        if (token !== '') {
            const json: DecodedToken = jwtDecode(token);
            if (json.role_user !== 'customer') {
                navigate(routeConstants.ADMIN_HOMEPAGE);
            }
        }
    }, [navigate, token]);

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
