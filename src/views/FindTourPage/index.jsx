import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import tourService from 'services/tourService';
import Inner from 'views/FindTourPage/Inner';

const Wrapper = memo(() => {
    const navigate = useNavigate();
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

    const handleFindTour = useCallback(
        values => {
            for (const key in values) {
                if (values[key] === undefined) {
                    values[key] = '';
                }
            }
            const filteredParams = Object.fromEntries(
                Object.entries(values).filter(([_, value]) => value !== '')
            );
            if (filteredParams['departure_date']) {
                filteredParams['departure_date'] = dayjs(
                    filteredParams['departure_date']
                ).format('YYYY-MM-DD');
            }
            const queryString = new URLSearchParams(filteredParams).toString();

            navigate(`${routeConstants.SEARCH_RESULTS}?${queryString}`);
        },
        [navigate]
    );

    useEffect(() => {
        getAllDestinations();
    }, [getAllDestinations]);

    return (
        <Inner
            allDestinations={allDestinations}
            handleFindTour={handleFindTour}
        />
    );
});

Wrapper.displayName = 'Find Tour';

const FindTourPage = Wrapper;

export default FindTourPage;
