import OutstandingItem from 'components/OutstandingItem';
import Title from 'components/Title';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.scss';

const OutstandingListLocation: FC = () => {
    return (
        <div className="outstanding-location">
            <div className="outstanding-location__header">
                <Title title="Các địa điểm nổi bật của BK Travel" />
                <Link to="/">Xem thêm</Link>
            </div>

            <div className="outstanding-location__list">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={40}
                    navigation={false}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    speed={1000}
                    breakpoints={{
                        1498: {
                            slidesPerView: 5
                        },
                        1150: {
                            slidesPerView: 4
                        },
                        800: {
                            slidesPerView: 3
                        },
                        596: {
                            slidesPerView: 2
                        }
                    }}
                >
                    <SwiperSlide>
                        <OutstandingItem
                            imgURL="/images/slide1.jpg"
                            location="TP. Hồ Chí Minh"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OutstandingItem
                            imgURL="/images/slide2.jpg"
                            location="TP. Hồ Chí Minh"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OutstandingItem
                            imgURL="/images/slide3.jpg"
                            location="TP. Hồ Chí Minh"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OutstandingItem
                            imgURL="/images/slide4.jpg"
                            location="TP. Hồ Chí Minh"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OutstandingItem
                            imgURL="/images/slide5.jpg"
                            location="TP. Hồ Chí Minh"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OutstandingItem
                            imgURL="/images/slide6.jpg"
                            location="TP. Hồ Chí Minh"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OutstandingItem
                            imgURL="/images/slide1.jpg"
                            location="TP. Hồ Chí Minh"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default OutstandingListLocation;
