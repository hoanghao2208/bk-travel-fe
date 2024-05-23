import { Tooltip } from 'antd';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.scss';

interface TourItemProps {
    tour_id: number;
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
        tour_id,
        imgURL,
        tourName,
        price,
        departure_place,
        destination_place,
        time,
        departure_date,
        departure_time,
    }) => {
        const navigate = useNavigate();

        return (
            <div
                className="tour-item-completed"
                onClick={() => {
                    if (!destination_place.includes('[')) {
                        navigate(`/schedule/information/detail/${tour_id}`);
                    }
                }}
            >
                <img
                    src={imgURL || '/images/cover_image_df.jpg'}
                    alt="tour-img"
                    className="tour-item-completed--img"
                />
                <div className="tour-item-completed--infor">
                    <div className="tour-item-completed--title">
                        <Tooltip placement="top" title={tourName}>
                            <h3>{tourName}</h3>
                        </Tooltip>
                        <span>{parseFloat(price).toLocaleString()} VNĐ</span>
                    </div>
                    <div className="tour-item-completed--row">
                        <div>
                            <span>Khởi hành từ: </span>
                            <span>{departure_place}</span>
                        </div>
                        <div>
                            <span>Điểm đến: </span>
                            <span>
                                {' '}
                                {destination_place.includes('[')
                                    ? JSON.parse(destination_place).join(', ')
                                    : destination_place}
                            </span>
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
