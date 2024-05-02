import { FC, memo } from 'react';
import { getCustomerId } from 'reducers/token/function';
import '../styles.scss';

interface MessageItemProps {
    content: string;
    messId: number;
}

const MessageItem: FC<MessageItemProps> = memo(({ content, messId }) => {
    const userId = getCustomerId();

    return (
        <div
            className={`message-item ${
                messId === userId ? 'my-message-item' : ''
            }`}
        >
            {content}
        </div>
    );
});

MessageItem.displayName = 'Message Item';

export default MessageItem;
