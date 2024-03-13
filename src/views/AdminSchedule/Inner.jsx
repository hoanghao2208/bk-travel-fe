import { memo, useEffect } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import dayjs from 'dayjs';
import './style.scss';
import ScheduleList from 'views/AdminSchedule/views/ScheduleList';
import { Spin } from 'antd';

const Inner = memo(
    ({ form, tourData, column, handleScheduleTour, loading }) => {
        useEffect(() => {
            document.title = 'Lên lịch trình tour';
        });

        return (
            <Spin tip="Vui lòng chờ" size="large" spinning={loading}>
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
                            <ScheduleList
                                form={form}
                                tourData={tourData}
                                column={column}
                                handleScheduleTour={handleScheduleTour}
                            />
                        </div>
                    </div>
                </AdminLayout>
            </Spin>
        );
    }
);

Inner.displayName = 'Admin Schedule Inner';

export default Inner;
