import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import tourService from 'services/tourService';
import Inner from 'views/SearchResultsPage/Inner';

const Wrapper = memo(() => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);

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

    useEffect(() => {
        handleFindTour();
    }, [handleFindTour]);

    return <Inner searchResults={searchResults} />;
});

Wrapper.displayName = 'Search Results';

const SearchResultsPage = Wrapper;

export default SearchResultsPage;
