import Title from 'components/Title';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TopLoationItem from 'components/TopLocationItem';

const TopLocationList: FC = memo(() => {
    return (
        <div className="top-list">
            <div className="outstanding-tour__header">
                <Title title="Không thể không đến" />
                <Link to="/">Xem thêm</Link>
            </div>

            <div className="top-list__all-items">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={40}
                    navigation={false}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    speed={1000}
                    breakpoints={{
                        1552: {
                            slidesPerView: 4,
                        },
                        1150: {
                            slidesPerView: 3,
                        },
                        748: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    <SwiperSlide>
                        <TopLoationItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopLoationItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopLoationItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopLoationItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopLoationItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopLoationItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopLoationItem />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
});

TopLocationList.displayName = 'TopLocationList';

export default TopLocationList;
