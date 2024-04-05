import { Button } from 'antd';
import Message from 'components/Message';
import ProductWrapper from 'components/ProductWrapper';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerId } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import orderService from 'services/orderService';
import userService from 'services/userService';
import NoItemInCart from 'views/CartPage/components/NoItemInCart';
import './style.scss';

const Inner = memo(
    ({ cartList, reload, setReload, selectedTour, setSelectedTour }) => {
        useEffect(() => {
            document.title = 'Giỏ hàng';
        });
        const userId = getCustomerId();
        const navigate = useNavigate();

        const [userInfor, setUserInfor] = useState([]);

        const selectedOrder = useMemo(() => {
            const selected = cartList?.cart?.order_items.filter(item =>
                selectedTour.includes(item.tour_id)
            );
            return selected;
        }, [cartList?.cart?.order_items, selectedTour]);

        const getUserInfor = useCallback(async () => {
            try {
                const response = await userService.getUserInfo(userId);
                if (response?.status === 200) {
                    setUserInfor(response.data.user_info);
                }
            } catch (error) {
                console.error(error);
            }
        }, [userId]);

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

                if (body.phone_customer === '') {
                    navigate(routeConstants.USER_PROFILE);
                    Message.sendWarning('Vui lòng cập nhật số điện thoại');
                    return;
                }
                const response = await orderService.createCartOrder(body);
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
            }
        }, [navigate, selectedOrder, selectedTour, userId, userInfor]);

        useEffect(() => {
            getUserInfor();
        }, [getUserInfor]);

        if (cartList?.userId === '') {
            return null;
        }

        return (
            <UserHomePageLayout>
                <div className="cart">
                    <h2 className="cart-title">Giỏ hàng</h2>
                    {cartList?.cart?.order_items?.length === 0 ? (
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
                                        <p className="cart__content--price-grade">
                                            * Bạn sẽ nhận được 123 điểm thành
                                            viên sau khi thanh toán
                                        </p>
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
