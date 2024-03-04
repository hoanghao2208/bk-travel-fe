import { memo, useCallback, useEffect, useState } from 'react';
import Inner from 'views/AdminSchedule/Inner';
import tourService from 'services/tourService';
import { useParams } from 'react-router-dom';

const Wrapper = memo(() => {
    const { tour_id } = useParams();
    const [tourData, setTourData] = useState({});
    const [column, setColumn] = useState(0);

    const handleGetTourDetails = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourData(response.data.data);
                const timeString = response.data.data.time;
                const columnNumber = parseInt(timeString.match(/\d+/)[0]);
                setColumn(columnNumber);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetTourDetails();
    }, [handleGetTourDetails]);

    return <Inner tourData={tourData} column={column} />;
});

Wrapper.displayName = 'Admin Schedule';

const AdminSchedule = Wrapper;

export default AdminSchedule;
