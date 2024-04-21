import { memo, useCallback, useEffect, useState } from 'react';
import customTourService from 'services/customTourService';
import Inner from 'views/AdminManageCustomTours/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Quản lý tour đề xuất';
    });

    const [pendingTours, setPendingTours] = useState([]);

    const getAllPendingTours = useCallback(async () => {
        try {
            const response = await customTourService.getAllPendingTours();
            if (response?.status === 200) {
                setPendingTours(response.data.tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getAllPendingTours();
    }, [getAllPendingTours]);

    return <Inner pendingTours={pendingTours} />;
});

Wrapper.displayName = 'Admin Manage Custom Tour';

const AdminManageCustomTours = Wrapper;

export default AdminManageCustomTours;
