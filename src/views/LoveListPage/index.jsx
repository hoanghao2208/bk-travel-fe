import { memo } from 'react';
import Inner from 'views/LoveListPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Love List';

const LoveListPage = Wrapper;

export default LoveListPage;
