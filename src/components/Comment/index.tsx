import { Rate } from 'antd';
import { FC, memo } from 'react';
import './styles.scss';

interface CommentProps {
    name?: string;
    rate: number;
    date: string;
    content: string;
}

const Comment: FC<CommentProps> = memo(
    ({ name = 'Người dùng BK Travel', rate, date, content }) => {
        return (
            <div className="user-comment">
                <div className="user-comment__header">
                    <div>
                        <span className="user-comment__header--name">
                            {name}
                        </span>
                        <Rate disabled allowHalf defaultValue={rate} />
                    </div>
                    <span className="user-comment__header--date">{date}</span>
                </div>
                <p className="user-comment__content">{content}</p>
            </div>
        );
    }
);

Comment.displayName = 'Comment';

export default Comment;
