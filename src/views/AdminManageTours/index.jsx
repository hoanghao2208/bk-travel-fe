import { memo, useCallback, useEffect, useState } from 'react';
import tourService from 'services/tourService';
import Inner from 'views/AdminManageTours/Inner';

const Wrapper = memo(() => {
    const [waitingTours, setWaitingTours] = useState([]);
    const [deletedTours, setDeletedTours] = useState([]);
    const [onlineTours, setOnlineTours] = useState([]);
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

    const handleGetOnlineTours = useCallback(async () => {
        try {
            const response = await tourService.getOnlineTour();
            if (response?.status === 200) {
                setOnlineTours(response?.data.tours);
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

    useEffect(() => {
        handleGetOnlineTours();
    }, [handleGetOnlineTours, refresh]);

    return (
        <Inner
            waitingTours={waitingTours}
            deletedTours={deletedTours}
            onlineTours={onlineTours}
            setRefresh={setRefresh}
        />
    );
});

Wrapper.displayName = 'Admin Manage Tours';

const AdminManageTours = Wrapper;

export default AdminManageTours;
