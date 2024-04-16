import Title from 'components/Title';
import dayjs from 'dayjs';
import UserActivityLayout from 'layouts/UserActivityLayout';
import { memo } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import OrderItem from 'views/UserOders/components/OrderItem';
import './style.scss';

const Inner = memo(({ completedOrders }) => {
    return (
        <UserActivityLayout>
            <div className="orders">
                <Title title="Đơn hàng đã thanh toán" />
                <div className="orders--list">
                    {completedOrders.map(order => (
                        <OrderItem
                            key={order.order_id}
                            paymentId={order.payment_id}
                            total_price={parseInt(order.total)}
                            total_to_pay={parseInt(order.total_to_pay)}
                            date={dayjs(order.createdAt).format(
                                DEFAULT_DISPLAY_DATE_FORMAT
                            )}
                        />
                    ))}
                </div>
            </div>
        </UserActivityLayout>
    );
});

Inner.displayName = 'User Order Inner';

export default Inner;
