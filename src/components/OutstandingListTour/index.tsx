import Title from 'components/Title';
import TourItem from 'components/TourItem';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import tourService from 'services/tourService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import { ITour } from 'utils/type';
import './styles.scss';

dayjs.extend(isSameOrAfter);

const OutstandingListTour: FC = () => {
    const [allTours, setAllTours] = useState<ITour[]>([]);
    const [onlineTours, setOnlineTours] = useState<ITour[]>([]);

    const handleGetOnlineTours = useCallback(async () => {
        try {
            const response = await tourService.getOnlineTour();
            if (response?.status === 200) {
                setAllTours(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        handleGetOnlineTours();
    }, [handleGetOnlineTours]);

    useEffect(() => {
        const now = dayjs().startOf('day');
        const isOnlineTours = allTours?.filter(tour =>
            dayjs(tour.deadline_book_time).isSameOrAfter(now)
        );
        setOnlineTours(isOnlineTours);
    }, [allTours]);

    if (allTours?.length <= 0 || !allTours) {
        return null;
    }

    return (
        <div className="outstanding-tour">
            <div className="outstanding-tour__header">
                <Title title="Các tour mới của BK Travel" />
                {onlineTours.length > 4 && (
                    <Link to={routeConstants.ALL_TOURS}>Xem thêm</Link>
                )}
            </div>

            <div className="outstanding-tour__list">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={40}
                    navigation={false}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
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
                    {onlineTours.length > 0 &&
                        onlineTours.map(tour => (
                            <SwiperSlide key={tour.tour_id}>
                                <TourItem
                                    haveBtn={true}
                                    bgItem={true}
                                    tourId={tour.tour_id}
                                    imgURL={tour.cover_image}
                                    departureTime={dayjs(
                                        tour.departure_date
                                    ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                    time={tour.time}
                                    tourName={tour.name}
                                    departurePlace={tour.departure_place}
                                    empty={
                                        tour.max_customer -
                                        tour.booked_number
                                    }
                                    deadlineBookTime={dayjs(
                                        tour.deadline_book_time
                                    ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                    price={parseInt(tour.price)}
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
};

export default OutstandingListTour;
