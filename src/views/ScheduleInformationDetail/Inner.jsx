import { memo } from 'react';

const Inner = memo(() => {
    return <div>Hello</div>;
});

Inner.displayName = 'Schedule Information Detail Inner';

export default Inner;
