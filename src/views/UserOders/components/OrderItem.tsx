import { Button } from 'antd';
import dayjs from 'dayjs';
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import orderService from 'services/orderService';
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
        const token = getToken();

        const handleNavigate = useCallback(() => {
            const tourIds = tours
                .map((tour: any) => tour.tour_id)
                .join('&tourId=');
            navigate(
                `${routeConstants.FILL_INFORMATION}?tourId=${tourIds}&orderId=${order_id}`
            );
        }, [navigate, order_id, tours]);

        const handleCancelOrder = useCallback(async () => {
            try {
                const body = {
                    order_id: order_id,
                    payment_id: paymentId,
                };
                const response = await orderService.cancelOrder(body, token);
                if (response?.status === 200) {
                    if (
                        new URL(response.data.link_payment).origin !==
                        window.location.origin
                    ) {
                        window.location.href = response.data.link_payment;
                    } else {
                        navigate(response.data.link_payment);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }, [navigate, order_id, paymentId, token]);

        return (
            <div className="orders-item">
                <div className="orders-item--header">
                    {isPayment && (
                        <div className="orders-item--id">
                            <span>Mã đơn hàng</span>
                            <span>{paymentId}</span>
                        </div>
                    )}
                    <div className="orders-item--status-wrapper">
                        {isPayment ? (
                            <span className="orders-item--status">
                                Đã thanh toán
                            </span>
                        ) : (
                            <span className="orders-pending-item--status">
                                Chưa thanh toán
                            </span>
                        )}
                        {isPayment ? (
                            <Button
                                danger
                                type="primary"
                                onClick={handleCancelOrder}
                            >
                                Hủy đơn hàng
                            </Button>
                        ) : (
                            <Button type="primary" onClick={handleNavigate}>
                                Thanh toán ngay
                            </Button>
                        )}
                    </div>
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
