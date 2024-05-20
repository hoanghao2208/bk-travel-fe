import Title from 'components/Title';
import dayjs from 'dayjs';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import NoData from 'views/AdminManageCustomTours/components/NoData';
import CustomItem from 'views/ListCustomTours/components/CustomItem';
import './styles.scss';

const renderCustomItem = (tours, name, status) => (
    <div className="custom-list--item">
        <Title title={`Danh sách tour ${name}`} />
        <div className="custom-list--item--wrapper">
            {tours.map(tour => (
                <CustomItem
                    key={tour.tour_id}
                    tour_id={tour.tour_id}
                    status={status}
                    tourName={tour.name}
                    departure={tour.departure_place}
                    departureTime={tour.departure_time}
                    departureDate={dayjs(tour.departure_date).format(
                        DEFAULT_DISPLAY_DATE_FORMAT
                    )}
                    time={tour.time}
                    note={tour.note}
                    numberCustomer={tour.max_customer}
                    attractions={tour.attractions}
                    destinations={JSON.parse(tour.destination_place).join(', ')}
                    price={
                        status === 'SUCCESS' ? parseInt(tour.price) : undefined
                    }
                />
            ))}
        </div>
    </div>
);

const Inner = memo(({ pendingTours, successTours, rejectedTours }) => {
    return (
        <UserHomePageLayout>
            <div className="custom-list">
                {pendingTours?.length === 0 &&
                    successTours?.length === 0 &&
                    rejectedTours?.length === 0 && <NoData />}
                {pendingTours?.length > 0 &&
                    renderCustomItem(pendingTours, 'đang chờ', 'PENDING')}
                {successTours?.length > 0 &&
                    renderCustomItem(
                        successTours,
                        'đã được chấp nhận',
                        'SUCCESS'
                    )}
                {rejectedTours?.length > 0 &&
                    renderCustomItem(
                        rejectedTours,
                        'đã bị từ chối',
                        'REJECTED'
                    )}
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'List Custom Tours Inner';

export default Inner;
