import { FC } from 'react';
import './styles.scss';
import Title from 'components/Title';
import TourItem from 'components/TourItem';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const OutstandingListTour: FC = () => {
    return (
        <div className="outstanding-tour">
            <div className="outstanding-tour__header">
                <Title title="Các tour nổi bật của BK Travel" />
                <Link to="/">Xem thêm {'>>>'}</Link>
            </div>

            <div className="outstanding-tour__list">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={40}
                    slidesPerView={4}
                    navigation={false}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    speed={1000}
                >
                    <SwiperSlide>
                        <TourItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default OutstandingListTour;
