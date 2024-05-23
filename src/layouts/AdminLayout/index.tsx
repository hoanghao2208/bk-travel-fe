import AdminHeader from 'components/Admin/AdminHeader';
import AdminMenu from 'components/Admin/AdminMenu';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FC, memo, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import './styles.scss';

interface DecodedToken extends JwtPayload {
    role_user: string;
}

const AdminLayout: FC<PropsWithChildren> = memo(({ children }) => {
    const token = getToken();
    const navigate = useNavigate();

    const json: DecodedToken = jwtDecode(token);

    useEffect(() => {
        if (json.role_user === 'customer') {
            navigate(routeConstants.USER_HOME_PAGE);
        } else if (json.role_user === 'guider') {
            navigate(routeConstants.TOURGUIDE_HOMEPAGE);
        }
    }, [json, navigate]);

    return (
        <div className="admin-layout">
            <AdminMenu />
            <div className="admin-layout__content">
                <AdminHeader />
                <div className="admin-layout__container">{children}</div>
            </div>
        </div>
    );
});

AdminLayout.displayName = 'Admin Layout';

export default AdminLayout;
