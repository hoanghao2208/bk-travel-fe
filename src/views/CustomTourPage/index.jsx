import { memo, useCallback, useEffect, useState } from 'react';
import tourService from 'services/tourService';
import Inner from 'views/CustomTourPage/Inner';

const Wrapper = memo(() => {
    const [allDestinations, setAllDestinations] = useState([]);

    const getAllDestinations = useCallback(async () => {
        try {
            const response = await tourService.getAllDestinations();
            if (response.status === 200) {
                const allDes = response.data.data;
                allDes.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                setAllDestinations(allDes);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getAllDestinations();
    }, [getAllDestinations]);

    return <Inner allDestinations={allDestinations} />;
});

Wrapper.displayName = 'Custom Tour';

const CustomTourPage = Wrapper;

export default CustomTourPage;
