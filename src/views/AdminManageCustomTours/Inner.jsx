import dayjs from 'dayjs';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useState } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import PendingItem from 'views/AdminManageCustomTours/components/PendingItem';
import './styles.scss';

const Inner = memo(({ pendingTours }) => {
    const [activeTab, setActiveTab] = useState('PENDING');

    const handleChangeTab = currentTab => {
        setActiveTab(currentTab);
    };

    return (
        <AdminLayout>
            <div className="admin-manage-custom">
                <div className="admin-manage-custom--header">
                    <div
                        className={`admin-manage-custom--header--item ${
                            activeTab === 'PENDING' ? 'active' : ''
                        }`}
                        onClick={() => handleChangeTab('PENDING')}
                    >
                        Tour chờ phê duyệt
                    </div>
                    <div
                        className={`admin-manage-custom--header--item ${
                            activeTab === 'CONFIRM' ? 'active' : ''
                        }`}
                        onClick={() => handleChangeTab('CONFIRM')}
                    >
                        Tour đã xác nhận
                    </div>
                    <div
                        className={`admin-manage-custom--header--item ${
                            activeTab === 'REJECT' ? 'active' : ''
                        }`}
                        onClick={() => handleChangeTab('REJECT')}
                    >
                        Tour đã từ chối
                    </div>
                </div>
                <div className="admin-manage-custom--wrapper">
                    {activeTab === 'PENDING' &&
                        pendingTours.map(tour => (
                            <PendingItem
                                key={tour.tour_id}
                                status={activeTab}
                                name={tour.name}
                                departure_place={tour.departure_place}
                                departure_time={tour.departure_time}
                                departure_date={dayjs(
                                    tour.departure_date
                                ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                time={tour.time}
                                note={tour.note}
                                destination_place={JSON.parse(
                                    tour.destination_place
                                ).join(', ')}
                            />
                        ))}
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Manage Custom Tour Inner';

export default Inner;
