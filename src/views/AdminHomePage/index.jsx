import { memo, useCallback, useEffect, useState } from 'react';
import { getToken } from 'reducers/token/function';
import adminService from 'services/adminService';
import tourGuideService from 'services/tourGuideService';
import tourService from 'services/tourService';
import Inner from 'views/AdminHomePage/Inner';

const Wrapper = memo(() => {
    const token = getToken();

    const [allTour, setAllTour] = useState(undefined);
    const [allTourguides, setAllTourguides] = useState(undefined);
    const [topRatedTours, setTopRatedTours] = useState([]);
    const [totalBooked, setTotalBooked] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const handleGetAllTours = useCallback(async () => {
        try {
            const response = await tourService.getAllTour();
            if (response?.status === 200) {
                setAllTour(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleGetAllTourGuides = useCallback(async () => {
        try {
            const response = await tourGuideService.getAllTourGuides(token);
            if (response?.status === 200) {
                setAllTourguides(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    const handleGetTotalBooked = useCallback(async () => {
        try {
            const response = await adminService.getTotalBooked(token);
            if (response?.status === 200) {
                setTotalBooked(response.data.total);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    const handleGetRevenue = useCallback(async () => {
        try {
            const response = await adminService.getTotalRevenue(token);
            if (response?.status === 200) {
                setTotalRevenue(response.data.total_revenue);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    const handleGetTopRatedTours = useCallback(async () => {
        try {
            const response = await adminService.getTopRatedTours();
            if (response?.status === 200) {
                setTopRatedTours(response.data.data.slice(0, 5));
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        handleGetAllTours();
    }, [handleGetAllTours]);

    useEffect(() => {
        handleGetAllTourGuides();
    }, [handleGetAllTourGuides]);

    useEffect(() => {
        handleGetTotalBooked();
    }, [handleGetTotalBooked]);

    useEffect(() => {
        handleGetRevenue();
    }, [handleGetRevenue]);

    useEffect(() => {
        handleGetTopRatedTours();
    }, [handleGetTopRatedTours]);

    return (
        <Inner
            allTour={allTour}
            allTourguides={allTourguides}
            totalBooked={totalBooked}
            totalRevenue={totalRevenue}
            topRatedTours={topRatedTours}
        />
    );
});

Wrapper.displayName = 'Admin Homepage';

const AdminHomePage = Wrapper;

export default AdminHomePage;
