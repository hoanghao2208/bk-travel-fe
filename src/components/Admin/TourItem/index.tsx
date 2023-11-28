import { FC, memo } from 'react';
import './styles.scss';

interface TourItemProps {
    imgURL: string;
    date: string;
    type: string;
    tourName: string;
    departure: string;
    destination: string;
}

const TourItem: FC<TourItemProps> = memo(
    ({ imgURL, date, type, tourName, departure, destination }) => {
        return (
            <div className="admin-tour-item">
                <div className="admin-tour-item__image">
                    <img
                        src={imgURL}
                        alt="admin-tour-item"
                        className="admin-tour-item__image--img"
                    />
                </div>
                <div className="admin-tour-item__info">
                    <div className="admin-tour-item__info--date">
                        <span>
                            Ngày <span>{date} - </span>
                        </span>
                        <span>{type}</span>
                    </div>
                    <p className="admin-tour-item__info--name">{tourName}</p>
                    <div className="admin-tour-item__info--location">
                        <div className="admin-tour-item__info--location-item">
                            <span>Nơi khởi hành:</span>
                            <span>{departure}</span>
                        </div>
                        <div className="admin-tour-item__info--location-item">
                            <span>Điểm đến:</span>
                            <span>{destination}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

TourItem.displayName = 'Admin Tour Item';

export default TourItem;
