import Title from 'components/Title';
import UserActivityLayout from 'layouts/UserActivityLayout';
import { memo } from 'react';
import NoData from 'views/AdminManageCustomTours/components/NoData';
import CanceledOrderItem from 'views/CanceledOrders/components/CanceledOrderItem';
import './style.scss';

const Inner = memo(({ canceledOrders }) => {
    return (
        <UserActivityLayout>
            <div className="orders">
                <Title title="Đơn hàng đã hủy" />
                <div className="orders--list">
                    {canceledOrders?.map(order => (
                        <CanceledOrderItem
                            key={order.order_id}
                            total_price={parseInt(order.total)}
                            total_to_pay={parseInt(order.total_to_pay)}
                            tours={order.tours}
                            isPending={true}
                        />
                    ))}
                </div>
                {canceledOrders.length === 0 && <NoData />}
            </div>
        </UserActivityLayout>
    );
});

Inner.displayName = 'Pending Orders Inner';

export default Inner;
