import { FC, memo } from 'react';
import '../style.scss';

interface OrderItemProps {
    paymentId: number;
    total_price: number;
    total_to_pay: number;
    date: string;
}

const OrderItem: FC<OrderItemProps> = memo(
    ({ paymentId, total_price, total_to_pay, date }) => {
        return (
            <div className="orders-item">
                <div className="orders-item--row">
                    <div className="orders-item--content">
                        <span>Mã đơn hàng </span>
                        <span>{paymentId}</span>
                    </div>
                    <div className="orders-item--content">
                        <span>Giá tiền </span>
                        <span>{total_price.toLocaleString()} VNĐ</span>
                    </div>
                </div>
                <div className="orders-item--row">
                    <div className="orders-item--content">
                        <span>Giá thanh toán </span>
                        <span>{total_to_pay.toLocaleString()} VNĐ</span>
                    </div>
                    <div className="orders-item--content">
                        <span>Ngày thanh toán </span>
                        <span>{date}</span>
                    </div>
                </div>
                <div className="orders-item--status">Đã thanh toán</div>
            </div>
        );
    }
);

OrderItem.displayName = 'Order Item';

export default OrderItem;
