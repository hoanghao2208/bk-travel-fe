import TourGuideHeader from 'components/TourGuideHeader';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import './styles.scss';

interface DecodedToken extends JwtPayload {
    role_user: string;
}

const TourGuideLayout: FC<PropsWithChildren> = ({ children }) => {
    const token = getToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token !== '') {
            const json: DecodedToken = jwtDecode(token);
            if (json.role_user === 'admin') {
                navigate(routeConstants.ADMIN_HOMEPAGE);
            } else if (json.role_user === 'customer') {
                navigate(routeConstants.USER_HOME_PAGE);
            }
        }
    }, [navigate, token]);

    return (
        <>
            <TourGuideHeader />
            <div className="user-homepage__wrapper">{children}</div>
        </>
    );
};

export default TourGuideLayout;
