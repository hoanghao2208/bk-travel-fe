import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import customTourService from 'services/customTourService';
import Inner from 'views/ListCustomTours/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Danh sách tour đề xuất';
    });

    const token = getToken();

    const [pendingTours, setPendingTours] = useState([]);
    const [successTours, setSuccessTours] = useState([]);
    const [rejectedTours, setRejectedTours] = useState([]);

    const userId = getCustomerId();

    const getAllPendingTours = useCallback(async () => {
        try {
            const response = await customTourService.getPendingTourByUser(
                userId,
                token
            );
            if (response?.status === 200) {
                setPendingTours(response.data.data[0].tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    const getAllSuccessTours = useCallback(async () => {
        try {
            const response = await customTourService.getSuccessTourByUser(
                userId,
                token
            );
            if (response?.status === 200) {
                setSuccessTours(response.data.data[0].tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    const getAllRejectedTours = useCallback(async () => {
        try {
            const response = await customTourService.getRejectedTourByUser(
                userId,
                token
            );
            if (response?.status === 200) {
                setRejectedTours(response.data.data[0].tours);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

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
