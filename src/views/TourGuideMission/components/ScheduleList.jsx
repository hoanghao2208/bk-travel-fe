import { CompassFilled } from '@ant-design/icons';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_DISPLAY_DATE_FORMAT, TIME_FORMAT } from 'utils/constants';
import FormList from 'views/TourGuideMission/components/FormList';
import './style.scss';

const ScheduleList = memo(
    ({ form, tourData, scheduleData, column, handleUpdateSchedule }) => {
        const { tour_id } = useParams();

        const filterScheduleData = useCallback(data => {
            return {
                ...data,
                schedule_detail: data.schedule_detail
                    .map(schedule => {
                        return {
                            ...schedule,
                            detail: schedule.detail.filter(
                                item =>
                                    item.status !== undefined &&
                                    item.reason !== ''
                            ),
                        };
                    })
                    .filter(schedule => schedule.detail.length > 0),
            };
        }, []);

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
                    item.note = item.note?.trim() || '';
                    item.status = item.status || '';
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

            let scheduleData = {
                tour_id,
                schedule_detail,
            };

            scheduleData = filterScheduleData(scheduleData);

            // console.log('scheduleData', scheduleData);

            handleUpdateSchedule(scheduleData);
        };

        useEffect(() => {
            for (let i = 1; i <= column; i++) {
                const fieldName = `schedule-${i}`;
                const UPDATE_SCHEDULE_DEFAULT_VALUES = [];
                const dayData = scheduleData[i - 1];
                dayData?.detail.forEach(day => {
                    const [startTime, endTime] = day.range_time.split(' - ');
                    const dataItem = {
                        range_time: [
                            dayjs(startTime, TIME_FORMAT),
                            dayjs(endTime, TIME_FORMAT),
                        ],
                        name: day.name,
                        status: day.status,
                        note: day.note,
                    };
                    UPDATE_SCHEDULE_DEFAULT_VALUES.push(dataItem);
                });
                form.setFieldsValue({
                    [fieldName]: UPDATE_SCHEDULE_DEFAULT_VALUES,
                });
            }
        }, [column, form, scheduleData]);

        return (
            <div>
                <Form
                    form={form}
                    name="admin-manage-schedule"
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
    }
);

ScheduleList.displayName = 'ScheduleList';

export default ScheduleList;
