import { memo, useCallback, useEffect, useState } from 'react';
import { getToken } from 'reducers/token/function';
import tourService from 'services/tourService';
import Inner from 'views/AdminManageTours/Inner';

const Wrapper = memo(() => {
    const token = getToken();

    const [waitingTours, setWaitingTours] = useState([]);
    const [deletedTours, setDeletedTours] = useState([]);
    const [onlineTours, setOnlineTours] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const handleGetWaitingTours = useCallback(async () => {
        try {
            const response = await tourService.getWaitingTour(token);
            if (response?.status === 200) {
                setWaitingTours(response?.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    }, [token]);

    const handleGetOnlineTours = useCallback(async () => {
        try {
            const response = await tourService.getOnlineTour();
            if (response?.status === 200) {
                setOnlineTours(response?.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleGetDeletedTours = useCallback(async () => {
        try {
            const response = await tourService.getDeletedTour(token);
            if (response?.status === 200) {
                setDeletedTours(response?.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    }, [token]);

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
