import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import tourService from 'services/tourService';
import Inner from 'views/SearchResultsPage/Inner';

const Wrapper = memo(() => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [allDestinations, setAllDestinations] = useState([]);
    const [reload, setReload] = useState(false);

    const navigate = useNavigate();

    const handleFindTour = useCallback(async () => {
        try {
            const params = Object.fromEntries(searchParams.entries());
            const response = await tourService.findTour(params);

            if (response?.status === 200) {
                setSearchResults(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [searchParams]);

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

    const handleFilterTours = useCallback(
        values => {
            if (
                values.departure_date === false &&
                values.time === undefined &&
                values.departure_place === undefined &&
                values.destination_place === undefined
            ) {
                return;
            }

            for (const key in values) {
                if (values[key] === undefined || values[key] === null) {
                    values[key] = '';
                }
            }
            const filteredParams = Object.fromEntries(
                Object.entries(values).filter(
                    ([_, value]) => value !== '' && value !== false
                )
            );
            if (filteredParams['departure_date']) {
                filteredParams['departure_date'] = dayjs(
                    filteredParams['departure_date']
                ).format('YYYY-MM-DD');
            }
            const queryString = new URLSearchParams(filteredParams).toString();

            navigate(`${routeConstants.SEARCH_RESULTS}?${queryString}`);
            setReload(prev => !prev);
        },
        [navigate, setReload]
    );

    useEffect(() => {
        handleFindTour();
    }, [handleFindTour, reload]);

    useEffect(() => {
        getAllDestinations();
    }, [getAllDestinations]);

    return (
        <Inner
            searchResults={searchResults}
            allDestinations={allDestinations}
            handleFilterTours={handleFilterTours}
        />
    );
});

Wrapper.displayName = 'Search Results';

const SearchResultsPage = Wrapper;

export default SearchResultsPage;
