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
                <Link to="/">Xem thêm</Link>
            </div>

            <div className="outstanding-tour__list">
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
                        <TourItem haveBtn={true} bgItem={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem haveBtn={true} bgItem={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem haveBtn={true} bgItem={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem haveBtn={true} bgItem={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem haveBtn={true} bgItem={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TourItem haveBtn={true} bgItem={true} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default OutstandingListTour;
