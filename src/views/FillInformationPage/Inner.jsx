import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';
import PayCostItem from 'components/PayCostItem';
import ProductItem from 'components/ProductItem';
import StepByStep from 'components/StepByStep';
import Title from 'components/Title';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect } from 'react';
import './style.scss';

const Inner = memo(
    ({
        form,
        orderInfor,
        orderItems,
        listVoucher,
        handleApplyVoucher,
        handleRemoveVoucher,
        handlePaymentDirectly,
    }) => {
        useEffect(() => {
            document.title = 'Thông tin thanh toán';
        });

        const handleFinish = useCallback(
            value => {
                handleApplyVoucher(value);
            },
            [handleApplyVoucher]
        );

        return (
            <UserHomePageLayout>
                <div className="fill-infor">
                    <div className="fill-infor--step">
                        <StepByStep currentPage={1} />
                    </div>
                    <div className="fill-infor__content">
                        <div className="fill-infor__form">
                            <h3 className="fill-infor__form-title">
                                Điền thông tin
                            </h3>
                            <div className="fill-infor__form--product">
                                <div className="fill-infor__form--product-title">
                                    <Title title="Thông tin đơn hàng" />
                                </div>

                                {orderItems &&
                                    orderItems.length > 0 &&
                                    orderItems.map(tour => (
                                        <div
                                            className="fill-infor__form--product-item"
                                            key={tour.id}
                                        >
                                            <ProductItem
                                                tourId={tour.tour_id}
                                                adultQuantity={
                                                    tour.adult_quantity
                                                }
                                                childQuantity={
                                                    tour.child_quantity
                                                }
                                            />
                                        </div>
                                    ))}
                            </div>
                            <div className="fill-infor__form--voucher">
                                <div className="fill-infor__form--voucher-title">
                                    <Title title="Ưu đãi" />
                                </div>
                                <div className="fill-infor__form--voucher-box">
                                    <div className="fill-infor__form--voucher-input">
                                        <p className="fill-infor__form--voucher-desc">
                                            Vui lòng nhập mã ưu đãi của bạn
                                        </p>
                                        <Form
                                            form={form}
                                            name="apply-voucher"
                                            onFinish={handleFinish}
                                            autoComplete="off"
                                        >
                                            <div className="fill-infor__form--voucher-inpt">
                                                <div className="fill-infor__form--voucher-input">
                                                    <Form.Item name="voucher_code">
                                                        <Input placeholder="Nhập mã ưu đãi" />
                                                    </Form.Item>
                                                </div>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                >
                                                    Áp dụng
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                    {listVoucher.length > 0 && (
                                        <div className="fill-infor__form--voucher-list">
                                            <p>
                                                Danh sách ưu đãi đã được áp dụng
                                            </p>
                                            <div className="fill-infor__form--voucher-list-wrapper">
                                                <div>
                                                    <span className="first-label">
                                                        Mã giảm giá
                                                    </span>
                                                    <span>Giá giảm</span>
                                                    <span></span>
                                                </div>

                                                {listVoucher.map(voucher => (
                                                    <div
                                                        key={voucher.voucher_id}
                                                    >
                                                        <span className="first-label">
                                                            {
                                                                voucher.code_voucher
                                                            }
                                                        </span>
                                                        <span>
                                                            -{' '}
                                                            {voucher.type ===
                                                            'fixed'
                                                                ? `${voucher.value_discount.toLocaleString()} VNĐ`
                                                                : `${
                                                                      voucher.value_discount *
                                                                      100
                                                                  } %`}
                                                        </span>

                                                        <Tooltip
                                                            placement="top"
                                                            title="Hủy voucher"
                                                        >
                                                            <Button
                                                                type="link"
                                                                onClick={() =>
                                                                    handleRemoveVoucher(
                                                                        voucher.code_voucher
                                                                    )
                                                                }
                                                            >
                                                                <CloseOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="fill-infor__content--price">
                            <PayCostItem
                                cost={parseInt(orderInfor?.total)}
                                reduced={
                                    parseInt(orderInfor?.total) -
                                    parseInt(orderInfor?.total_to_pay)
                                }
                                total={parseInt(orderInfor?.total_to_pay)}
                            />
                            <div className="fill-infor__content--btn">
                                <Button
                                    type="primary"
                                    onClick={handlePaymentDirectly}
                                >
                                    Thanh toán ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </UserHomePageLayout>
        );
    }
);

Inner.displayName = 'Fill Information Inner';

export default Inner;
