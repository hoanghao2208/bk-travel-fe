import { memo } from 'react';
import Inner from 'views/DetailTourPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Detail Tour';

const DetailTourPage = Wrapper;

export default DetailTourPage;
