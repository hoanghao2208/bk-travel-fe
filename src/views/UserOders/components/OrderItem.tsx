import { Button } from 'antd';
import dayjs from 'dayjs';
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import TourItem from 'views/UserOders/components/TourItem';
import '../style.scss';

interface OrderItemProps {
    order_id: number;
    paymentId: number;
    total_price: number;
    total_to_pay: number;
    date: string;
    tours: any;
    isPayment?: boolean;
    isPending?: boolean;
}

const OrderItem: FC<OrderItemProps> = memo(
    ({
        order_id,
        paymentId,
        total_price,
        total_to_pay,
        date,
        tours,
        isPayment = true,
        isPending = false,
    }) => {
        const navigate = useNavigate();
        const handleNavigate = useCallback(() => {
            const tourIds = tours
                .map((tour: any) => tour.tour_id)
                .join('&tourId=');
            navigate(
                `${routeConstants.FILL_INFORMATION}?tourId=${tourIds}&orderId=${order_id}`
            );
        }, [navigate, order_id, tours]);
        return (
            <div className="orders-item">
                <div className="orders-item--header">
                    {isPayment && (
                        <div className="orders-item--id">
                            <span>Mã đơn hàng</span>
                            <span>{paymentId}</span>
                        </div>
                    )}
                    {isPayment ? (
                        <span className="orders-item--status">
                            Đã thanh toán
                        </span>
                    ) : (
                        <span className="orders-pending-item--status">
                            Chưa thanh toán
                        </span>
                    )}
                    {!isPayment && (
                        <Button type="primary" onClick={handleNavigate}>
                            Thanh toán ngay
                        </Button>
                    )}
                </div>
                <div className="orders-item--tours">
                    {tours?.map((tour: any) => (
                        <TourItem
                            key={tour.tour_id}
                            tour_id={tour.tour_id}
                            imgURL={tour.cover_image}
                            tourName={tour.name}
                            price={tour.price}
                            departure_place={tour.departure_place}
                            destination_place={tour.destination_place}
                            time={tour.time}
                            departure_date={dayjs(tour.departure_date).format(
                                DEFAULT_DISPLAY_DATE_FORMAT
                            )}
                            departure_time={tour.departure_time}
                            isPending={isPending}
                        />
                    ))}
                </div>
                <div className="orders-item--total">
                    {isPayment ? (
                        <div className="orders-item--date">
                            <span>Ngày đặt tour: </span>
                            <span>{date}</span>
                        </div>
                    ) : (
                        <div />
                    )}
                    <div className="orders-item--totalPrice">
                        <span>{total_to_pay.toLocaleString()} VNĐ</span>
                        {total_to_pay !== total_price && (
                            <span className="old-price">
                                {total_price.toLocaleString()} VNĐ
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

OrderItem.displayName = 'Order Item';

export default OrderItem;
