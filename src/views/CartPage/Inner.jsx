import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import Message from 'components/Message';
import ProductWrapper from 'components/ProductWrapper';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from 'reducers/profile/function';
import { getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import orderService from 'services/orderService';
import NoItemInCart from 'views/CartPage/components/NoItemInCart';
import './style.scss';

const Inner = memo(
    ({ cartList, reload, setReload, selectedTour, setSelectedTour }) => {
        useEffect(() => {
            document.title = 'Giỏ hàng';
        });

        const token = getToken();
        const userId = getCustomerId();
        const userInfor = useUserProfile();
        const navigate = useNavigate();

        const selectedOrder = useMemo(() => {
            const selected = cartList?.cart?.order_items.filter(item =>
                selectedTour.includes(item.tour_id)
            );
            return selected;
        }, [cartList?.cart?.order_items, selectedTour]);

        const totalPrice = useMemo(() => {
            if (!cartList?.cart?.order_items) return 0;
            return cartList.cart.order_items.reduce((total, item) => {
                if (selectedTour.includes(item.tour_id)) {
                    return total + parseInt(item.total_price);
                }
                return total;
            }, 0);
        }, [cartList?.cart?.order_items, selectedTour]);

        const handleCreateCartOrder = useCallback(async () => {
            try {
                const body = {
                    user_id: userId,
                    order_items: selectedOrder.map(item => item.id),
                    name_customer:
                        userInfor?.firstname + ' ' + userInfor?.lastname,
                    phone_customer: userInfor?.phone_number,
                    address_customer: 'TP. Hồ Chí Minh',
                };

                if (
                    body.phone_customer === null ||
                    body.phone_customer === ''
                ) {
                    navigate(routeConstants.USER_PROFILE);
                    Message.sendWarning('Vui lòng cập nhật số điện thoại');
                    return;
                }
                const response = await orderService.createCartOrder(
                    body,
                    token
                );
                if (response?.status === 200) {
                    const tourIds = selectedTour
                        .map(tourId => `tourId=${tourId}`)
                        .join('&');
                    navigate(
                        `${routeConstants.FILL_INFORMATION}?${tourIds}&orderId=${response.data.order.order_id}`
                    );
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Đã có lỗi xãy ra, vui lòng thử lại');
            }
        }, [navigate, selectedOrder, selectedTour, token, userId, userInfor]);

        if (cartList?.userId === '') {
            return null;
        }

        return (
            <UserHomePageLayout>
                <div className="cart">
                    <h2 className="cart-title">Giỏ hàng</h2>
                    {cartList?.cart?.order_items?.length === 0 ||
                    cartList?.cart === null ? (
                        <NoItemInCart />
                    ) : (
                        <div className="cart__content">
                            <div className="cart__content--all-products">
                                <div className="cart__content--items">
                                    {cartList?.cart?.order_items.map(order => (
                                        <div
                                            className="cart__content--item"
                                            key={order.id}
                                        >
                                            <ProductWrapper
                                                tourId={order.tour_id}
                                                cartId={order.cart_id}
                                                adultQuantity={
                                                    order.adult_quantity
                                                }
                                                childQuantity={
                                                    order.child_quantity
                                                }
                                                totalPrice={order.total_price}
                                                reload={reload}
                                                setReload={setReload}
                                                selectedTour={selectedTour}
                                                setSelectedTour={
                                                    setSelectedTour
                                                }
                                            />
                                        </div>
                                    ))}
                                    <p className="cart__content--status">
                                        <ExclamationCircleFilled />
                                        Một số đơn hàng của bạn trước đó có thể
                                        đã bị loại bỏ khỏi giỏ hàng với lý do đã
                                        hết hạng đặt chổ.
                                    </p>
                                </div>
                            </div>
                            <div className="cart__content--price">
                                <h3 className="cart__content--price-title">
                                    Hóa đơn
                                </h3>
                                {selectedTour.length > 0 && (
                                    <>
                                        <div className="cart__content--price-number">
                                            <span>Số tour</span>
                                            <span>{selectedTour.length}</span>
                                        </div>
                                        <h4 className="cart__content--price-cost">
                                            {totalPrice.toLocaleString()} VNĐ
                                        </h4>
                                        <div className="cart__content--price-btn">
                                            <Button
                                                type="primary"
                                                onClick={handleCreateCartOrder}
                                            >
                                                Thanh toán ngay
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </UserHomePageLayout>
        );
    }
);

Inner.displayName = 'Cart Inner';

export default Inner;
