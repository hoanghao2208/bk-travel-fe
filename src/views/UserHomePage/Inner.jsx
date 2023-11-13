import { memo, useEffect } from 'react';
import './style.scss';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LocationSlide from 'components/LocationSlide';
import OutstandingListTour from 'components/OutstandingListTour';
import OutstandingListLocation from 'components/OutstandingListLocation';
import TopLocationList from 'components/TopLocationList';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Trang chủ';
    });
    return (
        <UserHomePageLayout>
            <div className="swiper-wrapper">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    speed={1000}
                >
                    <SwiperSlide>
                        <LocationSlide
                            imgURL="/images/slide2.jpg"
                            description="Chào mừng bạn đến với thế giới của chúng tôi, nơi mà mỗi hành trình trở thành một cuộc phiêu lưu đặc biệt."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LocationSlide
                            imgURL="/images/slide3.jpg"
                            description="Chúng tôi tin rằng mỗi chuyến đi không chỉ là một đích đến mà còn là một cơ hội để khám phá bản thân. "
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LocationSlide
                            imgURL="/images/slide4.jpg"
                            description="Chúng tôi không chỉ đưa bạn đến những địa điểm nổi tiếng, mà còn muốn bạn trải nghiệm và kết nối với văn hóa địa phương."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LocationSlide
                            imgURL="/images/slide1.jpg"
                            description="Mỗi chuyến đi của bạn không chỉ là một hành trình đến những địa điểm mới mẻ mà còn là một hành trình của trái tim bạn. Chúng tôi tin rằng du lịch có sức mạnh làm thay đổi cuộc sống và tạo ra những kí ức đẹp."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LocationSlide
                            imgURL="/images/slide5.jpg"
                            description="Tại đây, chúng tôi không chỉ tạo ra những chương trình du lịch, mà còn mang đến cho bạn những trải nghiệm độc đáo, nơi mà lịch trình không chỉ là danh sách điểm đến mà còn là hành trình của sự tự khám phá."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LocationSlide
                            imgURL="/images/slide6.jpg"
                            description="Chúng tôi cam kết mang lại trải nghiệm du lịch mà bạn không chỉ cảm thấy hài lòng mà còn tận hưởng mọi khoảnh khắc một cách trọn vẹn."
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="homepage-container">
                <OutstandingListTour />
                <OutstandingListLocation />
                <TopLocationList />
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'User HomePage Inner';

export default Inner;
