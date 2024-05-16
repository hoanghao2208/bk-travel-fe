import TourItem from 'components/TourItem';
import dayjs from 'dayjs';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './style.scss';

const Inner = memo(({ onlineTours }) => {
    return (
        <UserHomePageLayout>
            <div className="all-tours">
                <h3 className="all-tours--title">
                    Danh sách tất cả các tour du lịch trên hệ thống
                </h3>
                <div className="all-tours--wrapper">
                    {onlineTours.length > 0 &&
                        onlineTours.map(tour => (
                            <TourItem
                                key={tour.tour_id}
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
                                    tour.max_customer - tour.current_customers
                                }
                                deadlineBookTime={dayjs(
                                    tour.deadline_book_time
                                ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                price={parseInt(tour.price)}
                            />
                        ))}
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'User All Tours Inner';

export default Inner;
