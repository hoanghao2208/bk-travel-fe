import { SendOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import OutstandingItem from 'components/OutstandingItem';
import dayjs from 'dayjs';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import ScheduleTable from 'views/ScheduleDetailPage/components/ScheduleTable';
import './style.scss';

const Inner = memo(({ tourData, scheduleData }) => {
    useEffect(() => {
        document.title = 'Lịch trình chi tiết';
    });

    if (
        !tourData ||
        !scheduleData ||
        !tourData.price ||
        !tourData.list_image ||
        !tourData.time
    ) {
        return null;
    }

    const imageList = JSON.parse(tourData.list_image);
    const columnNumber = parseInt(tourData.time.match(/\d+/)[0]);

    return (
        <UserHomePageLayout>
            <div className="schedule-detail">
                <div className="schedule-detail__header">
                    <div className="schedule-detail__header--left">
                        <h3 className="schedule-detail__header--left-title">
                            {tourData?.name}
                        </h3>
                        <div className="schedule-detail__header--left-info">
                            <div>
                                <span>Nơi khởi hành:</span>
                                <span>{tourData?.departure_place}</span>
                            </div>
                            <div>
                                <span>Số chổ trống:</span>
                                <span>
                                    {tourData?.max_customer -
                                        tourData?.current_customers}
                                </span>
                            </div>
                            <div>
                                <span>Hạn đặt chổ:</span>
                                <span>
                                    {dayjs(tourData?.deadline_book_time).format(
                                        DEFAULT_DISPLAY_DATE_FORMAT
                                    )}
                                </span>
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
                            {tourData?.price.toLocaleString()} VNĐ
                        </h3>
                    </div>
                </div>

                <div className="schedule-detail__image">
                    <div className="schedule-detail__image--primary">
                        <Image src={tourData.cover_image} height={500} />
                    </div>
                    <div className="schedule-detail__image--normal">
                        {imageList.slice(0, 2).map((image, index) => (
                            <div key={index}>
                                <Image src={image} height={240} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="schedule-detail__information">
                    <div className="schedule-detail__information--left">
                        <div>
                            <span>Ngày khởi hành:</span>
                            <span>
                                {dayjs(tourData.departure_date).format(
                                    DEFAULT_DISPLAY_DATE_FORMAT
                                )}
                            </span>
                        </div>
                        <div>
                            <span>Thời gian tập trung:</span>
                            <span>{tourData.departure_time}</span>
                        </div>
                        <div>
                            <span>Thời gian tour:</span>
                            <span>{tourData.time}</span>
                        </div>
                        <div>
                            <span>Hướng dẫn viên:</span>
                            <span>Dương Hoàng Hảo</span>
                        </div>
                    </div>
                    <div className="schedule-detail__information--right">
                        <h3>Điểm nhấn</h3>
                        <p className="schedule-detail__information--right-hightlight">
                            {tourData.highlight}
                        </p>
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
                            {imageList.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <OutstandingItem imgURL={image} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="schedule-detail__timeline">
                    <h3 className="schedule-detail__slider--title">
                        Lịch trình tour
                    </h3>
                    <ScheduleTable
                        columnNumber={columnNumber}
                        tourData={tourData}
                        scheduleData={scheduleData}
                    />
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Schedule Detail Inner';

export default Inner;
