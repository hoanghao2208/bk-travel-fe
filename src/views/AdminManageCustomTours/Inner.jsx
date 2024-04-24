import dayjs from 'dayjs';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useState } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import NoData from 'views/AdminManageCustomTours/components/NoData';
import PendingItem from 'views/AdminManageCustomTours/components/PendingItem';
import './styles.scss';

const Inner = memo(
    ({ pendingTours, successTours, rejectedTours, setReload }) => {
        const [activeTab, setActiveTab] = useState('PENDING');

        const handleChangeTab = currentTab => {
            setActiveTab(currentTab);
        };

        const tabs = [
            { tabName: 'PENDING', tours: pendingTours },
            { tabName: 'SUCCESS', tours: successTours },
            { tabName: 'REJECT', tours: rejectedTours },
        ];

        return (
            <AdminLayout>
                <div className="admin-manage-custom">
                    <div className="admin-manage-custom--header">
                        {tabs.map(({ tabName }) => (
                            <div
                                key={tabName}
                                className={`admin-manage-custom--header--item ${
                                    activeTab === tabName ? 'active' : ''
                                }`}
                                onClick={() => handleChangeTab(tabName)}
                            >
                                {tabName === 'PENDING' && 'Tour chờ phê duyệt'}
                                {tabName === 'SUCCESS' && 'Tour đã xác nhận'}
                                {tabName === 'REJECT' && 'Tour đã từ chối'}
                            </div>
                        ))}
                    </div>
                    <div className="admin-manage-custom--wrapper">
                        {tabs.map(
                            ({ tabName, tours }) =>
                                activeTab === tabName &&
                                tours.length === 0 && <NoData key={tabName} />
                        )}
                        {tabs.map(
                            ({ tabName, tours }) =>
                                activeTab === tabName &&
                                tours.map(tour => (
                                    <PendingItem
                                        key={tour.tour_id}
                                        status={tabName}
                                        tourId={tour.tour_id}
                                        userId={tour.users[0].user_id}
                                        name={tour.name}
                                        departure_place={tour.departure_place}
                                        departure_time={tour.departure_time}
                                        departure_date={dayjs(
                                            tour.departure_date
                                        ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                        {...(tabName === 'SUCCESS' && {
                                            price: parseInt(tour.price),
                                        })}
                                        attractions={tour.attractions}
                                        time={tour.time}
                                        note={tour.note}
                                        destination_place={JSON.parse(
                                            tour.destination_place
                                        ).join(', ')}
                                        setReload={setReload}
                                    />
                                ))
                        )}
                    </div>
                </div>
            </AdminLayout>
        );
    }
);

Inner.displayName = 'Admin Manage Custom Tour Inner';

export default Inner;
