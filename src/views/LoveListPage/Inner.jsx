import { Pagination } from 'antd';
import Title from 'components/Title';
import TourItem from 'components/TourItem';
import dayjs from 'dayjs';
import UserActivityLayout from 'layouts/UserActivityLayout';
import { memo, useEffect } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './style.scss';

const Inner = memo(({ wishListTours }) => {
    useEffect(() => {
        document.title = 'Danh sách yêu thích';
    });

    return (
        <UserActivityLayout>
            <div className="love-list">
                <Title title="Danh sách yêu thích" />
                <div className="love-list__content">
                    {wishListTours &&
                        wishListTours.length > 0 &&
                        wishListTours.map(tour => (
                            <div
                                className="love-list__content--item"
                                key={tour.tour_id}
                            >
                                <TourItem
                                    haveBtn={false}
                                    bgItem={false}
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
                                        tour.current_customers
                                    }
                                    deadlineBookTime={dayjs(
                                        tour.deadline_book_time
                                    ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                    price={tour.price}
                                />
                            </div>
                        ))}
                </div>
                <div className="love-list__pagination">
                    <Pagination showSizeChanger defaultCurrent={1} total={20} />
                </div>
            </div>
        </UserActivityLayout>
    );
});

Inner.displayName = 'Love List Inner';

export default Inner;
