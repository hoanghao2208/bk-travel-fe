import { memo } from 'react';
import Inner from 'views/Message/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Message';

const Message = Wrapper;

export default Message;
