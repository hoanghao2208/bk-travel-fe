import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId } from 'reducers/token/function';
import customTourService from 'services/customTourService';
import Inner from 'views/ListCustomTours/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Danh sách tour đề xuất';
    });

    const [pendingTours, setPendingTours] = useState([]);
    const [successTours, setSuccessTours] = useState([]);
    const [rejectedTours, setRejectedTours] = useState([]);

    const userId = getCustomerId();

    const getAllPendingTours = useCallback(async () => {
        try {
            const response = await customTourService.getAllPendingTours(userId);
            if (response?.status === 200) {
                setPendingTours(response.data.tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    const getAllSuccessTours = useCallback(async () => {
        try {
            const response = await customTourService.getAllSuccessTours(userId);
            if (response?.status === 200) {
                setSuccessTours(response.data.tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    const getAllRejectedTours = useCallback(async () => {
        try {
            const response = await customTourService.getAllRejectedTours(
                userId
            );
            if (response?.status === 200) {
                setRejectedTours(response.data.tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    useEffect(() => {
        getAllPendingTours();
    }, [getAllPendingTours]);

    useEffect(() => {
        getAllSuccessTours();
    }, [getAllSuccessTours]);

    useEffect(() => {
        getAllRejectedTours();
    }, [getAllRejectedTours]);

    return (
        <Inner
            pendingTours={pendingTours}
            successTours={successTours}
            rejectedTours={rejectedTours}
        />
    );
});

Wrapper.displayName = 'List Custom Tours';

const ListCustomTours = Wrapper;

export default ListCustomTours;
