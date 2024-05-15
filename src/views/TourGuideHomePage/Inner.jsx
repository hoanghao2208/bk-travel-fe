import Title from 'components/Title';
import TourGuideLayout from 'layouts/TourGuideLayout';
import { memo } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import TourItem from 'views/TourGuideHomePage/components/TourItem';
import './style.scss';

const Inner = memo(() => {
    return (
        <TourGuideLayout>
            <div className="tourguide-home">
                <div>
                    <div className="tourguide-home__header">
                        <Title title="Tour được giao nhiệm vụ " />
                    </div>

                    <div className="tourguide-home__list">
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
                                1400: {
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
                                <TourItem />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </TourGuideLayout>
    );
});

Inner.displayName = 'TourGuider Homepage Inner';

export default Inner;
