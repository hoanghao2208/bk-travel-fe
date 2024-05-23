import UserFooter from 'components/UserFooter';
import UserHeader from 'components/UserHeader';
import UserLoginHeader from 'components/UserLoginHeader';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileActions } from 'reducers/profile';
import { getCustomerId, getToken, setCartCount } from 'reducers/token/function';
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
            const response = await userService.getUserInfo(userId, token);
            if (response?.status === 200) {
                dispatch(profileActions.SET_PROFILE(response.data.user_info));
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    const getNumberOfCart = useCallback(async () => {
        try {
            if (token === '') {
                return;
            }
            const response = await userService.getCartByUser(userId, token);
            if (response?.status === 200) {
                if (
                    response?.data.data !== null &&
                    response?.data.data.cart !== null
                ) {
                    const orderItems = response?.data.data.cart.order_items;
                    setCartCount(orderItems?.length);
                } else {
                    setCartCount(0);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        getNumberOfCart();
    }, [getNumberOfCart]);

    useEffect(() => {
        if (token !== '') {
            const json: DecodedToken = jwtDecode(token);
            if (json.role_user === 'admin') {
                navigate(routeConstants.ADMIN_HOMEPAGE);
            } else if (json.role_user === 'guider') {
                navigate(routeConstants.TOURGUIDE_HOMEPAGE);
            }
        }
    }, [navigate, token]);

    useEffect(() => {
        getUserInfor();
    }, [getUserInfor]);

    if (token === '') {
        return (
            <>
                <UserHeader />
                <div className="user-homepage__wrapper">{children}</div>
                <UserFooter />
            </>
        );
    }

    return (
        <>
            <UserLoginHeader />
            <div className="user-homepage__wrapper">{children}</div>
            <UserFooter />
        </>
    );
};

export default UserHomePageLayout;
