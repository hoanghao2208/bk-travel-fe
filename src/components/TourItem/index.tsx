import { CompassFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import HeartIcon from 'assets/icons/HeartIcon';
import HeartRedIcon from 'assets/icons/HeartRedIcon';
import Message from 'components/Message';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import './styles.scss';

interface TourItemProps {
    haveBtn: boolean;
    bgItem: boolean;
    tourId: number;
    imgURL: string;
    departureTime: string;
    time: string;
    tourName: string;
    departurePlace: string;
    empty: number;
    deadlineBookTime: string;
    price: number;
}

const TourItem: FC<TourItemProps> = memo(
    ({
        haveBtn,
        bgItem,
        tourId,
        imgURL,
        departureTime,
        time,
        tourName,
        departurePlace,
        empty,
        deadlineBookTime,
        price,
    }) => {
        const token = getToken();
        const userId = getCustomerId();
        const navigate = useNavigate();

        const [loveList, setLoveList] = useState<number[]>([]);

        const handleNavigate = () => {
            navigate(
                generatePath(routeConstants.DETAIL_TOUR, { tour_id: tourId })
            );
        };

        const handleGetWishListTours = useCallback(async () => {
            try {
                if (userId === 0) {
                    return;
                }
                const response = await userService.getWishList(userId);
                if (response?.status === 200) {
                    const tempLoveList = response.data.data.map(
                        (item: any) => item.tour_id
                    );
                    setLoveList(tempLoveList);
                }
            } catch (error) {
                console.error(error);
            }
        }, [userId]);

        const handleWishListTour = useCallback(async () => {
            if (token === '') {
                navigate(routeConstants.LOGIN);
                Message.sendWarning(
                    'Vui lòng đăng nhập để thực hiện chức năng này'
                );
                return;
            } else {
                if (!loveList.includes(tourId)) {
                    const response = await userService.addToWishList(
                        userId,
                        tourId
                    );
                    if (response?.status === 201) {
                        setLoveList(prev => [...prev, tourId]);
                    }
                } else {
                    const response = await userService.removeFromWishList(
                        userId,
                        tourId
                    );
                    if (response?.status === 200) {
                        setLoveList(prev => prev.filter(id => id !== tourId));
                    }
                }
            }
        }, [loveList, navigate, token, tourId, userId]);

        useEffect(() => {
            handleGetWishListTours();
        }, [handleGetWishListTours]);

        return (
            <div
                className="tour-item"
                style={{ backgroundColor: bgItem ? 'white' : '#f5f5f5' }}
            >
                <div className="tour-item__header">
                    <div
                        className="tour-item__header--icon"
                        onClick={handleWishListTour}
                    >
                        {!loveList.includes(tourId) ? (
                            <HeartIcon />
                        ) : (
                            <HeartRedIcon />
                        )}
                    </div>
                    <img
                        src={imgURL}
                        alt="tour location"
                        className="tour-item__header--img"
                        onClick={handleNavigate}
                    />
                </div>
                <div className="tour-item__center" onClick={handleNavigate}>
                    <div className="tour-item__center--date">
                        Ngày {departureTime} - {time}
                    </div>
                    <div className="tour-item__center--location">
                        <Tooltip title={tourName}>
                            <Link to="/">{tourName}</Link>
                        </Tooltip>
                    </div>
                    <div className="tour-item__center--start">
                        <span>Nơi khởi hành:</span>
                        <span className="tour-item__center--data">
                            {departurePlace}
                        </span>
                    </div>
                    <div className="tour-item__center--blank">
                        <span>Số chổ trống:</span>
                        <span className="tour-item__center--data">{empty}</span>
                    </div>
                    <div className="tour-item__center--expire">
                        <span>Hạn đặt chổ:</span>
                        <span className="tour-item__center--data">
                            {deadlineBookTime}
                        </span>
                    </div>
                    <div className="tour-item__center--price">
                        <span>{price.toLocaleString()}</span>
                        <span> VNĐ</span>
                    </div>
                </div>

                {haveBtn && (
                    <div className="tour-item__bottom">
                        <Button type="default" shape="round" size="large">
                            Thêm vào giỏ hàng
                        </Button>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<CompassFilled />}
                            size="large"
                        >
                            Đặt tour ngay
                        </Button>
                    </div>
                )}
            </div>
        );
    }
);

TourItem.displayName = 'Tour Item';

export default TourItem;
