import ClockIcon from 'assets/icons/ClockIcon';
import HotelIcon from 'assets/icons/HotelIcon';
import RightHandIcon from 'assets/icons/RightHandIcon';
import VehicleIcon from 'assets/icons/VehicleIcon';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useState } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './schedule.scss';

const ScheduleTable = memo(({ columnNumber, tourData, scheduleData }) => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [dayData, setDayDate] = useState(scheduleData[0].detail);

    const renderDateList = useCallback(() => {
        const list = [];
        for (let i = 0; i < columnNumber; i++) {
            const date = dayjs(tourData.departure_date).add(i, 'day');

            list.push(
                <div
                    key={i}
                    className={`schedule-table__left--item ${
                        selectedDay === i ? 'active' : ''
                    }`}
                    onClick={() => setSelectedDay(i)}
                >
                    <p>Ngày thứ {i + 1}</p>
                    <p>({date.format(DEFAULT_DISPLAY_DATE_FORMAT)})</p>
                </div>
            );
        }

        return list;
    }, [columnNumber, selectedDay, tourData.departure_date]);

    const handleGetDateSchedule = useCallback(() => {
        setDayDate(scheduleData[selectedDay].detail);
    }, [scheduleData, selectedDay]);

    useEffect(() => {
        handleGetDateSchedule();
    }, [handleGetDateSchedule]);

    if (scheduleData.length === 0) {
        return null;
    }

    return (
        <div className="schedule-table">
            <div className="schedule-table__left">{renderDateList()}</div>
            <div
                className="schedule-table__right"
                style={{ height: columnNumber * 100 }}
            >
                <div className="general--infor">
                    <HotelIcon />
                    <span>Nơi ở: </span>
                    <p>{scheduleData[selectedDay].hotels.join(', ')}</p>
                </div>
                <div className="general--infor">
                    <VehicleIcon />
                    <span>Phương tiện di chuyển: </span>
                    <p>{scheduleData[selectedDay].transport.join(', ')}</p>
                </div>
                {dayData.map((item, index) => (
                    <div key={index} className="schedule-table__right--item">
                        <div>
                            <ClockIcon />
                            <p>{item.range_time} :</p>
                            <p>{item.name}</p>
                        </div>
                        <div>
                            <div className="right-icon">
                                <RightHandIcon />
                            </div>
                            <p className="schedule-table__right--desc">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

ScheduleTable.displayName = 'ScheduleTable';

export default ScheduleTable;
