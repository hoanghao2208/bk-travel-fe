import { FC, PropsWithChildren, memo } from 'react';
import './styles.scss';
import AdminMenu from 'components/Admin/AdminMenu';
import AdminHeader from 'components/Admin/AdminHeader';

const AdminLayout: FC<PropsWithChildren> = memo(({ children }) => {
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
