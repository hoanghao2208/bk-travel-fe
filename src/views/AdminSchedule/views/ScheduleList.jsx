import { CompassFilled } from '@ant-design/icons';
import { Button, Form, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourService from 'services/tourService';
import { DEFAULT_DISPLAY_DATE_FORMAT, TIME_FORMAT } from 'utils/constants';
import FormList from 'views/AdminSchedule/views/FormList';
import './style.scss';

const SCHEDULE_DEFAULT_VALUE = [undefined];

const ScheduleList = memo(
    ({ form, tourData, destination, column, handleScheduleTour }) => {
        const { tour_id } = useParams();
        const [hotelOptions, setHotelOptions] = useState([]);

        const transportOptions = useMemo(
            () => [
                {
                    label: 'Xe đạp',
                    value: 'Xe đạp',
                },
                {
                    label: 'Xe máy',
                    value: 'Xe máy',
                },
                {
                    label: 'Xe ô tô',
                    value: 'Xe ô tô',
                },
                {
                    label: 'Xe khách',
                    value: 'Xe khách',
                },
                {
                    label: 'Tàu hỏa',
                    value: 'Tàu hỏa',
                },
                {
                    label: 'Tàu thủy',
                    value: 'Tàu thủy',
                },
                {
                    label: 'Máy bay',
                    value: 'Máy bay',
                },
            ],
            []
        );

        const handleGetHotels = useCallback(async () => {
            try {
                try {
                    const promises = destination.map(destination =>
                        tourService.getHotelByDestination(destination)
                    );
                    const responses = await Promise.all(promises);
                    const hotelsData = responses.map((response, index) => ({
                        label: destination[index],
                        options: response?.data.data.map(hotel => ({
                            label: hotel.name,
                            value: hotel.name,
                        })),
                    }));
                    setHotelOptions(hotelsData);
                } catch (error) {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }
        }, [destination]);

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
                        <div className="location-generals">
                            <div>
                                <Form.Item
                                    name={`hotels-${i + 1}`}
                                    label="Khách sạn"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn khách sạn',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        mode="multiple"
                                        placeholder="Khách sạn"
                                        options={hotelOptions}
                                        maxTagCount="responsive"
                                        maxTagPlaceholder={omittedValues => (
                                            <Tooltip
                                                title={omittedValues
                                                    .map(({ label }) => label)
                                                    .join(', ')}
                                            >
                                                <span>...</span>
                                            </Tooltip>
                                        )}
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    name={`transport-${i + 1}`}
                                    label="Phương tiện di chuyển"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn phương tiện di chuyển',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        mode="multiple"
                                        placeholder="Phương tiện di chuyển"
                                        options={transportOptions}
                                        maxTagCount="responsive"
                                        maxTagPlaceholder={omittedValues => (
                                            <Tooltip
                                                title={omittedValues
                                                    .map(({ label }) => label)
                                                    .join(', ')}
                                            >
                                                <span>...</span>
                                            </Tooltip>
                                        )}
                                    />
                                </Form.Item>
                            </div>
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
                const key = data[0];
                if (/^schedule-\d+$/.test(key)) {
                    data[1].forEach(item => {
                        item.range_time =
                            dayjs(item.range_time[0]).format(TIME_FORMAT) +
                            ' - ' +
                            dayjs(item.range_time[1]).format(TIME_FORMAT);
                        item.description = item.description.trim();
                        item.note = '';
                        item.status = '';
                    });
                }
            });

            const scheduleObject = Object.fromEntries(scheduleValues);

            const schedule_detail = [];
            for (let i = 0; i < column; i++) {
                const date = dayjs(tourData.departure_date)
                    .add(i, 'day')
                    .format(DEFAULT_DISPLAY_DATE_FORMAT);
                const schedule_date = `Ngày ${i + 1}`;
                const detail = scheduleObject[`schedule-${i + 1}`];
                const transport =
                    scheduleObject[`transport-${i + 1}`];
                const hotels = scheduleObject[`hotels-${i + 1}`];
                const data = {
                    date,
                    schedule_date,
                    hotels,
                    transport,
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

        useEffect(() => {
            handleGetHotels();
        }, [handleGetHotels]);

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
    }
);

ScheduleList.displayName = 'ScheduleList';

export default ScheduleList;
