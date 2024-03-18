import { CompassFilled } from '@ant-design/icons';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_DISPLAY_DATE_FORMAT, TIME_FORMAT } from 'utils/constants';
import FormList from 'views/AdminSchedule/views/FormList';
import './style.scss';

const SCHEDULE_DEFAULT_VALUE = [undefined];

const ScheduleList = memo(({ form, tourData, column, handleScheduleTour }) => {
    const { tour_id } = useParams();

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

    const onFinish = values => {
        const scheduleValues = Object.entries(values);

        scheduleValues.forEach(data => {
            data[1].forEach(item => {
                item.range_time =
                    dayjs(item.range_time[0]).format(TIME_FORMAT) +
                    ' - ' +
                    dayjs(item.range_time[1]).format(TIME_FORMAT);
                item.description = item.description.trim();
                item.note = item.note.trim();
            });
        });

        const schedule_detail = [];
        for (let i = 0; i < column; i++) {
            const date = dayjs(tourData.departure_date)
                .add(i, 'day')
                .format(DEFAULT_DISPLAY_DATE_FORMAT);
            const schedule_date = `Ngày ${i + 1}`;
            const detail = scheduleValues[i][1];
            const data = {
                date,
                schedule_date,
                detail,
            };
            schedule_detail.push(data);
        }

        const scheduleData = {
            tour_id,
            schedule_detail,
        };

        handleScheduleTour(scheduleData);
    };

    useEffect(() => {
        for (let i = 1; i <= column; i++) {
            const fieldName = `schedule-${i}`;
            form.setFieldsValue({
                [fieldName]: SCHEDULE_DEFAULT_VALUE,
            });
        }
    }, [column, form]);

    return (
        <div>
            <Form
                form={form}
                name="admin-schedule-list"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                {renderForms()}

                <Form.Item>
                    <div className="admin-schedule-confirm-btn">
                        <Button
                            type="primary"
                            htmlType="submit"
                            shape="round"
                            icon={<CompassFilled />}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
});

ScheduleList.displayName = 'ScheduleList';

export default ScheduleList;
