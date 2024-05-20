import { Spin } from 'antd';
import dayjs from 'dayjs';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useEffect } from 'react';
import ScheduleList from 'views/AdminUpdateSchedule/views/ScheduleList';
import './style.scss';

const Inner = memo(
    ({
        form,
        tourData,
        scheduleData,
        column,
        handleUpdateScheduleTour,
        loading,
    }) => {
        useEffect(() => {
            document.title = 'Lên lịch trình tour';
        });

        return (
            <Spin tip="Vui lòng chờ" size="large" spinning={loading}>
                <AdminLayout>
                    <div className="admin-schedule">
                        <div className="admin-schedule__header">
                            <h1 className="admin-schedule__header--title">
                                cập nhật lịch trình tour
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
                                scheduleData={scheduleData}
                                column={column}
                                handleUpdateScheduleTour={
                                    handleUpdateScheduleTour
                                }
                            />
                        </div>
                    </div>
                </AdminLayout>
            </Spin>
        );
    }
);

Inner.displayName = 'Admin Update Schedule Inner';

export default Inner;
