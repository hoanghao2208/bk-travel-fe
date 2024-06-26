import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

interface OutstandingItemProps {
    imgURL: string;
    location?: string;
}

const OutstandingItem: FC<OutstandingItemProps> = memo(
    ({ imgURL, location }) => {
        return (
            <div className="outstanding-item">
                <img
                    src={imgURL}
                    alt="outstanding item"
                    className="outstanding-item__img"
                />
                <Link to="/" className="outstanding-item__location">
                    {location}
                </Link>
            </div>
        );
    }
);

OutstandingItem.displayName = 'OutstandingItem';

export default OutstandingItem;
