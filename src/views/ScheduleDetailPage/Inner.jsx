import { memo, useEffect } from 'react';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { Button, Image } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import OutstandingItem from 'components/OutstandingItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Lịch trình chi tiết';
    });
    return (
        <UserHomePageLayout>
            <div className="schedule-detail">
                <div className="schedule-detail__header">
                    <div className="schedule-detail__header--left">
                        <h3 className="schedule-detail__header--left-title">
                            Đà Nẵng – KDL Bà Nà – Sơn Trà – Hội An – La Vang -
                            Động Phong Nha – Làng hương Thủy Xuân - Huế
                        </h3>
                        <div className="schedule-detail__header--left-info">
                            <div>
                                <span>Nơi khởi hành:</span>
                                <span>TP. Hồ Chí Minh</span>
                            </div>
                            <div>
                                <span>Số chổ trống:</span>
                                <span>10</span>
                            </div>
                            <div>
                                <span>Hạn đặt chổ:</span>
                                <span>12/10/2023</span>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-detail__header--right">
                        <div className="schedule-detail__header--right-btn">
                            <Button
                                type="primary"
                                icon={<SendOutlined />}
                                shape="round"
                            >
                                Đặt tour ngay
                            </Button>
                        </div>
                        <div className="schedule-detail__header--right-btn">
                            <Button shape="round">Liên hệ tư vấn</Button>
                        </div>
                        <h3 className="schedule-detail__header--right-price">
                            đ 10.500.802
                        </h3>
                    </div>
                </div>

                <div className="schedule-detail__image">
                    <div className="schedule-detail__image--primary">
                        <Image src="/images/slide5.jpg" height={500} />
                    </div>
                    <div className="schedule-detail__image--normal">
                        <div>
                            <Image src="/images/slide6.jpg" height={240} />
                        </div>
                        <div>
                            <Image src="/images/slide2.jpg" height={240} />
                        </div>
                    </div>
                </div>

                <div className="schedule-detail__information">
                    <div className="schedule-detail__information--left">
                        <div>
                            <span>Ngày khởi hành:</span>
                            <span>20/10/2023</span>
                        </div>
                        <div>
                            <span>Thời gian tập trung:</span>
                            <span>8:00 am</span>
                        </div>
                        <div>
                            <span>Số ngày:</span>
                            <span>4 ngày, 3 đêm</span>
                        </div>
                        <div>
                            <span>Hướng dẫn viên:</span>
                            <span>Dương Hoàng Hảo</span>
                        </div>
                    </div>
                    <div className="schedule-detail__information--right">
                        <h3>Điểm nhấn</h3>
                        <ul className="schedule-detail__information--right-hightlight">
                            <li>
                                Phố cổ Hội An với lung linh sắc màu của đèn lồng
                                và những hoạt động dân gian đặc sắc.
                            </li>
                            <li>
                                Đại Nội Huế rộng lớn nơi hoàng cung xưa của các
                                vua chúa Triều Nguyễn.
                            </li>
                            <li>Chùa Thiên Mụ - Biểu tượng xứ Huế mộng mơ.</li>
                            <li>
                                Động Phong Nha - Thuộc quần thể Di sản với hệ
                                thống sông ngầm dài nhất Thế Giới
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="schedule-detail__slider">
                    <h3 className="schedule-detail__slider--title">
                        Những địa điểm tham quan
                    </h3>
                    <div className="schedule-detail__slider--wrapper">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            spaceBetween={40}
                            navigation={false}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            speed={1000}
                            breakpoints={{
                                1498: {
                                    slidesPerView: 5,
                                },
                                1150: {
                                    slidesPerView: 4,
                                },
                                800: {
                                    slidesPerView: 3,
                                },
                                596: {
                                    slidesPerView: 2,
                                },
                            }}
                        >
                            <SwiperSlide>
                                <OutstandingItem imgURL="/images/slide1.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <OutstandingItem imgURL="/images/slide2.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <OutstandingItem imgURL="/images/slide3.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <OutstandingItem imgURL="/images/slide4.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <OutstandingItem imgURL="/images/slide5.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <OutstandingItem imgURL="/images/slide6.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <OutstandingItem imgURL="/images/slide1.jpg" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>

                <div className="schedule-detail__timeline">
                    <h3 className="schedule-detail__slider--title">
                        Lịch trình tour
                    </h3>
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Schedule Detail Inner';

export default Inner;
