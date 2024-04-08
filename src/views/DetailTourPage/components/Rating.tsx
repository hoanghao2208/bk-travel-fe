import { Rate } from 'antd';
import { FC, memo } from 'react';
import './styles.scss';

interface RatingProps {
    name?: string;
    rate: number;
    date: string;
    content: string;
}

const Rating: FC<RatingProps> = memo(
    ({ name = 'Người dùng BK Travel', rate, date, content }) => {
        return (
            <div className="user-rating">
                <div className="user-rating__header">
                    <div>
                        <span className="user-rating__header--name">
                            {name}
                        </span>
                        <Rate disabled allowHalf defaultValue={rate} />
                    </div>
                    <span className="user-rating__header--date">{date}</span>
                </div>
                <p className="user-rating__content">{content}</p>
            </div>
        );
    }
);

Rating.displayName = 'Rating';

export default Rating;
