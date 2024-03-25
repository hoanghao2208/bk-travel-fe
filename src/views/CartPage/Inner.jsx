import { Button } from 'antd';
import ProductWrapper from 'components/ProductWrapper';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect } from 'react';
import './style.scss';
import NoItemInCart from 'views/CartPage/components/NoItemInCart';

const Inner = memo(({ cartList, reload, setReload }) => {
    useEffect(() => {
        document.title = 'Giỏ hàng';
    });

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
                                            adultQuantity={order.adult_quantity}
                                            childQuantity={order.child_quantity}
                                            totalPrice={order.total_price}
                                            reload={reload}
                                            setReload={setReload}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="cart__content--price">
                            <h3 className="cart__content--price-title">
                                Hóa đơn
                            </h3>
                            <div className="cart__content--price-number">
                                <span>Số tour</span>
                                <span>2</span>
                            </div>
                            <h4 className="cart__content--price-cost">
                                đ 10.500.802
                            </h4>
                            <p className="cart__content--price-grade">
                                * Bạn sẽ nhận được 123 điểm thành viên sau khi
                                thanh toán
                            </p>
                            <div className="cart__content--price-btn">
                                <Button type="primary">Thanh toán ngay</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Cart Inner';

export default Inner;
