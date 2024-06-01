import { Tooltip } from 'antd';
import CancelIcon from 'assets/icons/CancelIcon';
import CheckBoxIcon from 'assets/icons/CheckBoxIcon';
import HotelIcon from 'assets/icons/HotelIcon';
import SparklingIcon from 'assets/icons/SparklingIcon';
import VehicleIcon from 'assets/icons/VehicleIcon';
import WarningIcon from 'assets/icons/WarningIcon';
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
                        <div className="general--infor">
                            <HotelIcon />
                            <span>Nơi ở: </span>
                            <p>{day.hotels.join(', ')}</p>
                        </div>
                        <div className="general--infor">
                            <VehicleIcon />
                            <span>Phương tiện di chuyển: </span>
                            <p>{day.transport.join(', ')}</p>
                        </div>
                        {day.detail.map(item => (
                            <div key={item.name}>
                                <div className="detail-time">
                                    <span>
                                        <SparklingIcon /> {item.range_time}:
                                    </span>
                                    <span className="detail-time--name">
                                        {' '}
                                        {item.name}
                                    </span>
                                    <Tooltip title={item.note}>
                                        {item.status === 'checkin' && (
                                            <CheckBoxIcon />
                                        )}
                                        {item.status === 'delay' && (
                                            <WarningIcon />
                                        )}
                                        {item.status === 'skip' && (
                                            <CancelIcon />
                                        )}
                                    </Tooltip>
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
