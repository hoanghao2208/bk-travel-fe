import { memo } from 'react';
import Inner from 'views/SearchResultsPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Search Results';

const SearchResultsPage = Wrapper;

export default SearchResultsPage;
