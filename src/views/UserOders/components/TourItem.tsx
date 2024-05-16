import { FC, memo } from 'react';
import '../style.scss';

interface TourItemProps {
    imgURL: string;
    tourName: string;
    price: string;
    departure_place: string;
    destination_place: string;
    time: string;
    departure_time: string;
    departure_date: string;
}

const TourItem: FC<TourItemProps> = memo(
    ({
        imgURL,
        tourName,
        price,
        departure_place,
        destination_place,
        time,
        departure_date,
        departure_time,
    }) => {
        return (
            <div className="tour-item-completed">
                <img
                    src={imgURL}
                    alt="tour-img"
                    className="tour-item-completed--img"
                />
                <div className="tour-item-completed--infor">
                    <div className="tour-item-completed--title">
                        <h3>{tourName}</h3>
                        <span>{parseFloat(price).toLocaleString()} VNĐ</span>
                    </div>
                    <div className="tour-item-completed--row">
                        <div>
                            <span>Khởi hành từ: </span>
                            <span>{departure_place}</span>
                        </div>
                        <div>
                            <span>Điểm đến: </span>
                            <span>{destination_place}</span>
                        </div>
                    </div>
                    <div className="tour-item-completed--row">
                        <div>
                            <span>Thời gian: </span>
                            <span>{time}</span>
                        </div>
                        <div>
                            <span>Khởi hành: </span>
                            <span>
                                {departure_time} - Ngày {departure_date}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

TourItem.displayName = 'Tour Item Order Completed';

export default TourItem;