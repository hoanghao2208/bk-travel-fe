import dayjs from 'dayjs';
import { FC, memo } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import TourItem from 'views/UserOders/components/TourItem';
import '../style.scss';

interface OrderItemProps {
    paymentId: number;
    total_price: number;
    total_to_pay: number;
    date: string;
    tours: any;
}

const OrderItem: FC<OrderItemProps> = memo(
    ({ paymentId, total_price, total_to_pay, date, tours }) => {
        return (
            <div className="orders-item">
                <div className="orders-item--header">
                    <div className="orders-item--id">
                        <span>Mã đơn hàng</span>
                        <span>{paymentId}</span>
                    </div>
                    <span className="orders-item--status">Đã thanh toán</span>
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
                        />
                    ))}
                </div>
                <div className="orders-item--total">
                    <div className="orders-item--date">
                        <span>Ngày đặt tour: </span>
                        <span>{date}</span>
                    </div>
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
