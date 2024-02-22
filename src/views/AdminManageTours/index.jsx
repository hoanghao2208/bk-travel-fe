import { memo, useCallback, useEffect, useState } from 'react';
import Inner from 'views/AdminManageTours/Inner';
import tourService from 'services/tourService';

const Wrapper = memo(() => {
    const [waitingTours, setWaitingTours] = useState([]);
    const [deletedTours, setDeletedTours] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const handleGetWaitingTours = useCallback(async () => {
        try {
            const response = await tourService.getWaitingTour();
            if (response?.status === 200) {
                setWaitingTours(response?.data.tours);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleGetDeletedTours = useCallback(async () => {
        try {
            const response = await tourService.getDeletedTour();
            if (response?.status === 200) {
                setDeletedTours(response?.data.tours);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        handleGetWaitingTours();
    }, [handleGetWaitingTours, refresh]);

    useEffect(() => {
        handleGetDeletedTours();
    }, [handleGetDeletedTours, refresh]);

    return (
        <Inner
            waitingTours={waitingTours}
            deletedTours={deletedTours}
            refresh={refresh}
            setRefresh={setRefresh}
        />
    );
});

Wrapper.displayName = 'Admin Manage Tours';

const AdminManageTours = Wrapper;

export default AdminManageTours;
