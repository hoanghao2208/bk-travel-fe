import { FC, memo } from 'react';
import { getCustomerId } from 'reducers/token/function';
import '../styles.scss';
import { formattedTime } from 'utils/function/format';

interface MessageItemProps {
    content: string;
    messId: number;
    time: string;
}

const MessageItem: FC<MessageItemProps> = memo(({ content, messId, time }) => {
    const userId = getCustomerId();

    return (
        <div
            className={`message-wrapper ${
                messId === userId ? 'display-time' : ''
            }`}
        >
            <div
                className={`message-item ${
                    messId === userId ? 'my-message-item' : ''
                }`}
            >
                {content}
            </div>
            <p className="message-item--time">{formattedTime(time)}</p>
        </div>
    );
});

MessageItem.displayName = 'Message Item';

export default MessageItem;
