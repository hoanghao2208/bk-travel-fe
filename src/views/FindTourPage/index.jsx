import { memo } from 'react';
import Inner from 'views/FindTourPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Find Tour';

const FindTourPage = Wrapper;

export default FindTourPage;
