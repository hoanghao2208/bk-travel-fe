import SparklingIcon from 'assets/icons/SparklingIcon';
import dayjs from 'dayjs';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo } from 'react';
import LoadableLoading from 'route/components/LoadableLoading';
import './style.scss';

const Inner = memo(({ tourDetail, scheduleDetail }) => {
    if (!scheduleDetail.schedule_detail) {
        return <LoadableLoading />;
    }

    return (
        <UserHomePageLayout>
            <div className="detail-schedule">
                <h3 className="detail-schedule--title">
                    Lịch trình chi tiết của tour du lịch
                </h3>
                {tourDetail.name && (
                    <p className="detail-schedule--intro">
                        {tourDetail.name} - Khởi hành ngày{' '}
                        {dayjs(tourDetail.departure_date).format('DD/MM/YYYY')}{' '}
                        - {tourDetail.time}
                    </p>
                )}
                {scheduleDetail?.schedule_detail.map(day => (
                    <div className="detail-schedule--content" key={day.date}>
                        <h4 className="detail-date">
                            {day.schedule_date} ({day.date})
                        </h4>
                        {day.detail.map(item => (
                            <div key={item.name}>
                                <div className="detail-time">
                                    <span>
                                        <SparklingIcon /> {item.range_time}:
                                    </span>
                                    <span> {item.name}</span>
                                </div>
                                <p className="detail-description">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Schedule Information Detail Inner';

export default Inner;
