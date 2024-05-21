import { Form } from 'antd';
import dayjs from 'dayjs';
import TourGuideLayout from 'layouts/TourGuideLayout';
import { memo } from 'react';
import ScheduleList from 'views/TourGuideMission/components/ScheduleList';
import './style.scss';

const Inner = memo(({ tourData, scheduleData, column }) => {
    const [form] = Form.useForm();

    return (
        <TourGuideLayout>
            <div className="tour-mission">
                <div className="tour-mission--header">
                    <h1 className="tour-mission--title">
                        hành trình tour du lịch
                    </h1>
                    {tourData.name && (
                        <p className="tour-mission--intro">
                            {tourData.name} - Khởi hành ngày{' '}
                            {dayjs(tourData.departure_date).format(
                                'DD/MM/YYYY'
                            )}{' '}
                            - {tourData.time}
                        </p>
                    )}
                </div>
                <div className="tour-mission--detail">
                    <ScheduleList
                        form={form}
                        tourData={tourData}
                        scheduleData={scheduleData}
                        column={column}
                        handleScheduleTour={() => {}}
                    />
                </div>
            </div>
        </TourGuideLayout>
    );
});

Inner.displayName = 'TourGuide Mission';

export default Inner;
