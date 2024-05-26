import { Button, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tourService from 'services/tourService';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import { ITour } from 'utils/type';
import '../style.scss';

interface TourItemProps {
    tour_id: number;
    description: string;
}

const TourItem: FC<TourItemProps> = memo(({ tour_id, description }) => {
    const navigate = useNavigate();
    const [tourDetail, setTourDetail] = useState<ITour>();

    const handleGetDetailTour = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourDetail(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetDetailTour();
    }, [handleGetDetailTour]);

    return (
        <div className="tour-item" style={{ backgroundColor: 'white' }}>
            <div className="tour-item__header">
                <img
                    src={tourDetail?.cover_image}
                    alt="tour location"
                    className="tour-item__header--img"
                />
            </div>
            <div className="tour-item__center">
                <div className="tour-item__center--date">
                    Ngày{' '}
                    {dayjs(tourDetail?.departure_date).format(
                        DEFAULT_DISPLAY_DATE_FORMAT
                    )}{' '}
                    - {tourDetail?.time}
                </div>
                <div className="tour-item__center--location">
                    <Tooltip title={tourDetail?.name}>
                        <Link to={`/tour-guide/missions/${tour_id}`}>
                            {tourDetail?.name}
                        </Link>
                    </Tooltip>
                </div>
                <div className="tour-item__center--start">
                    <span>Nơi khởi hành:</span>
                    <span className="tour-item__center--data">
                        TP. Hồ Chí Minh
                    </span>
                </div>
                <div className="tour-item__center--start">
                    <span>Số hành khách:</span>
                    <span className="tour-item__center--data">
                        {tourDetail?.booked_number}
                    </span>
                </div>
                <div className="tour-item__center--des">
                    <span>Mô tả: </span>
                    <span>{description}</span>
                </div>
            </div>

            <div className="tour-item__bottom">
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={() => navigate(`/tour-guide/missions/${tour_id}`)}
                >
                    Trang nhiệm vụ
                </Button>
            </div>
        </div>
    );
});

TourItem.displayName = 'TourGuide Tour Item';

export default TourItem;
