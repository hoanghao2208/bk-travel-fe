import { memo, useEffect } from 'react';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import StepByStep from 'components/StepByStep';
import { Button, Input } from 'antd';
import Title from 'components/Title';
import { EditOutlined } from '@ant-design/icons';
import ProductItem from 'components/ProductItem';
import PayCostItem from 'components/PayCostItem';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Thông tin thanh toán';
    });
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
                            <div className="fill-infor__form--product-item">
                                <ProductItem />
                            </div>
                        </div>
                        <div className="fill-infor__form--contact">
                            <div className="fill-infor__form--contact-title">
                                <Title title="Thông tin liên lạc" />
                            </div>
                            <p className="fill-infor__form--contact-desc">
                                Vui lòng điền các thông tin liên hệ cần thiết
                                của bạn
                            </p>
                            <div className="fill-infor__form--contact-box">
                                <div className="fill-infor__form--contact-inf">
                                    <div>
                                        <span>Họ</span>
                                        <span>Dương</span>
                                    </div>
                                    <div>
                                        <span>Tên</span>
                                        <span>Hoàng Hảo</span>
                                    </div>
                                    <div>
                                        <span>Số điện thoại</span>
                                        <span>0123456789</span>
                                    </div>
                                    <div>
                                        <span>Email</span>
                                        <span>duonghoanghao1234@gmail.com</span>
                                    </div>
                                </div>
                                <div className="fill-infor__form--contact-btn">
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined />}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </div>
                            </div>
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
                                    <div className="fill-infor__form--voucher-inpt">
                                        <Input placeholder="Nhập mã ưu đãi" />
                                        <Button type="primary">Áp dụng</Button>
                                    </div>
                                </div>
                                <div className="fill-infor__form--voucher-list">
                                    <p>Danh sách ưu đãi đã được áp dụng</p>
                                    <div className="fill-infor__form--voucher-list-wrapper">
                                        <div>
                                            <span>Mã giảm giá</span>
                                            <span>Giá giảm</span>
                                        </div>
                                        <div>
                                            <span>ABCDEF</span>
                                            <span>- đ 1.234.567</span>
                                        </div>
                                        <div>
                                            <span>ABCDEF</span>
                                            <span>- đ 1.234.567</span>
                                        </div>
                                        <div>
                                            <span>Tổng cộng</span>
                                            <span>- đ 4.567.890</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fill-infor__content--price">
                        <PayCostItem
                            location="Đà Nẵng – KDL Bà Nà – Sơn Trà – Hội An – La Vang - Động Phong Nha – Làng hương Thủy Xuân - Huế"
                            date="11/11/2023"
                            pack="3 ngày, 2 đêm"
                            departure="TP. Hồ Chí Minh"
                            time="8:00 am"
                            adult="3"
                            children="2"
                            cost="10.324.345"
                            reduced="1.234.567"
                            total="8.123.421"
                            score="234"
                        />
                        <div className="fill-infor__content--btn">
                            <Button type="primary">Thanh toán ngay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Fill Information Inner';

export default Inner;
