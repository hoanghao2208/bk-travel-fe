import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourService from 'services/tourService';
import Inner from 'views/DetailTourPage/Inner';

const Wrapper = memo(() => {
    const { tour_id } = useParams();
    const [tourData, setTourData] = useState([]);

    const handleGetTourData = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourData(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetTourData();
    }, [handleGetTourData]);

    return <Inner tourData={tourData} />;
});

Wrapper.displayName = 'Detail Tour';

const DetailTourPage = Wrapper;

export default DetailTourPage;
