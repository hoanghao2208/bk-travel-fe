import { memo } from 'react';
import Inner from 'views/FillInformationPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Fill Information Page';

const FillInformationPage = Wrapper;

export default FillInformationPage;
