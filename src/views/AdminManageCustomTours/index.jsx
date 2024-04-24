import { memo, useCallback, useEffect, useState } from 'react';
import customTourService from 'services/customTourService';
import Inner from 'views/AdminManageCustomTours/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Quản lý tour đề xuất';
    });

    const [pendingTours, setPendingTours] = useState([]);
    const [successTours, setSuccessTours] = useState([]);
    const [rejectedTours, setRejectedTours] = useState([]);
    const [reload, setReload] = useState(false);

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

    const getAllSuccessTours = useCallback(async () => {
        try {
            const response = await customTourService.getAllSuccessTours();
            if (response?.status === 200) {
                setSuccessTours(response.data.tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getAllRejectedTours = useCallback(async () => {
        try {
            const response = await customTourService.getAllRejectedTours();
            if (response?.status === 200) {
                setRejectedTours(response.data.tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getAllPendingTours();
    }, [getAllPendingTours, reload]);

    useEffect(() => {
        getAllSuccessTours();
    }, [getAllSuccessTours, reload]);

    useEffect(() => {
        getAllRejectedTours();
    }, [getAllRejectedTours, reload]);

    return (
        <Inner
            pendingTours={pendingTours}
            successTours={successTours}
            rejectedTours={rejectedTours}
            setReload={setReload}
        />
    );
});

Wrapper.displayName = 'Admin Manage Custom Tour';

const AdminManageCustomTours = Wrapper;

export default AdminManageCustomTours;
