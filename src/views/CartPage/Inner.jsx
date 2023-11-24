import { memo, useEffect } from 'react';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { Checkbox, Button } from 'antd';
import ProductWrapper from 'components/ProductWrapper';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Giỏ hàng';
    });
    return (
        <UserHomePageLayout>
            <div className="cart">
                <h2 className="cart-title">Giỏ hàng</h2>
                <div className="cart__content">
                    <div className="cart__content--all-products">
                        <div className="cart__content--check-all">
                            <Checkbox>Tất cả</Checkbox>
                            <Button danger>Xoá tour đã chọn</Button>
                        </div>
                        <div className="cart__content--items">
                            <div className="cart__content--item">
                                <Checkbox>
                                    <ProductWrapper />
                                </Checkbox>
                            </div>
                            <div className="cart__content--item">
                                <Checkbox>
                                    <ProductWrapper />
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                    <div className="cart__content--price">
                        <h3 className="cart__content--price-title">Hóa đơn</h3>
                        <div className="cart__content--price-number">
                            <span>Số tour</span>
                            <span>2</span>
                        </div>
                        <h4 className="cart__content--price-cost">
                            đ 10.500.802
                        </h4>
                        <p className="cart__content--price-grade">
                            * Bạn sẽ nhận được 123 điểm thành viên sau khi thanh
                            toán
                        </p>
                        <div className="cart__content--price-btn">
                            <Button type="primary">Thanh toán ngay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Cart Inner';

export default Inner;
