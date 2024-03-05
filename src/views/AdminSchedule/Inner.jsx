import { memo, useEffect } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import dayjs from 'dayjs';
import './style.scss';
import ScheduleList from 'views/AdminSchedule/views/ScheduleList';

const Inner = memo(({ tourData, column }) => {
    useEffect(() => {
        document.title = 'Lên lịch trình tour';
    });

    return (
        <AdminLayout>
            <div className="admin-schedule">
                <div className="admin-schedule__header">
                    <h1 className="admin-schedule__header--title">
                        lên lịch trình tour
                    </h1>
                    {tourData.name && (
                        <p className="admin-schedule__header--intro">
                            {tourData.name} - Khởi hành ngày{' '}
                            {dayjs(tourData.departure_date).format(
                                'DD/MM/YYYY'
                            )}{' '}
                            - {tourData.time}
                        </p>
                    )}
                </div>
                <div className="admin-schedule__content">
                    <ScheduleList tourData={tourData} column={column} />
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Schedule Inner';

export default Inner;
