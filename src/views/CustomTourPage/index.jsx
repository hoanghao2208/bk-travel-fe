import { memo } from 'react';
import Inner from 'views/CustomTourPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Custom Tour';

const CustomTourPage = Wrapper;

export default CustomTourPage;
