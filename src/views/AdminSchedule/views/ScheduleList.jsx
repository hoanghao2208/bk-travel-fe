import dayjs from 'dayjs';
import { memo } from 'react';
import FormList from 'views/AdminSchedule/views/FormList';

const ScheduleList = memo(({ tourData, column }) => {
    const renderForms = () => {
        const forms = [];
        for (let i = 0; i < column; i++) {
            const date = dayjs(tourData.departure_date).add(i, 'day');

            forms.push(
                <div key={i}>
                    <div className="location-header">
                        <p>
                            Ngày thứ {i + 1} ({date.format('DD/MM/YYYY')})
                        </p>
                    </div>
                    <FormList id={i + 1} />
                </div>
            );
        }
        return forms;
    };

    return <div>{renderForms()}</div>;
});

ScheduleList.displayName = 'ScheduleList';

export default ScheduleList;
