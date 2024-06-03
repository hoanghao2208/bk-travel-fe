import { CompassFilled } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Tooltip } from 'antd';
import Message from 'components/Message';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import customTourService from 'services/customTourService';
import tourService from 'services/tourService';
import {
    DEFAULT_DISPLAY_DATE_FORMAT,
    DIGIT_VALIDATE,
    TIME_FORMAT,
} from 'utils/constants';
import FormList from 'views/AdminSchedule/views/FormList';
import './style.scss';

const SCHEDULE_DEFAULT_VALUE = [undefined];

const ScheduleList = memo(
    ({ form, tourData, destination, column, handleScheduleTour }) => {
        const { tour_id } = useParams();
        const token = getToken();
        const navigate = useNavigate();

        const [hotelOptions, setHotelOptions] = useState([]);
        const [modalConfirm, setModalConfirm] = useState(false);

        const [searchParams] = useSearchParams();

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

        const prepareScheduleData = useCallback(
            values => {
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
                    const transport = scheduleObject[`transport-${i + 1}`];
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

                return {
                    tour_id,
                    schedule_detail,
                };
            },
            [column, tourData.departure_date, tour_id]
        );

        const onFinish = useCallback(
            values => {
                const scheduleData = prepareScheduleData(values);
                handleScheduleTour(scheduleData);
            },
            [handleScheduleTour, prepareScheduleData]
        );

        const handleCreateUserSchedule = useCallback(
            async values => {
                try {
                    const scheduleData = prepareScheduleData(values);
                    const response = await tourService.createUserSchedule(
                        scheduleData,
                        token
                    );

                    if (response?.status === 201) {
                        Message.sendSuccess(
                            'Khởi tạo lịch trình thành công, vui lòng báo giá cho khách hàng'
                        );
                        form.resetFields();
                        setModalConfirm(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            [form, prepareScheduleData, token]
        );

        const handleConfirmTourPrice = useCallback(
            async value => {
                try {
                    const body = {
                        user_id: Object.fromEntries(searchParams.entries())
                            .userId,
                        status: 'success',
                        price: value.price,
                    };
                    const response = await customTourService.responseCustomTour(
                        tour_id,
                        body,
                        token
                    );
                    if (response?.status === 200) {
                        Message.sendSuccess('Bạn đã phản hồi thành công');
                        setModalConfirm(false);
                        navigate(routeConstants.ADMIN_MANAGE_CUSTOM_TOURS);
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            [navigate, searchParams, token, tour_id]
        );

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
            <>
                <div>
                    <Form
                        form={form}
                        name="admin-schedule-list"
                        onFinish={
                            searchParams.size === 0
                                ? onFinish
                                : handleCreateUserSchedule
                        }
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
                <Modal
                    open={modalConfirm}
                    title="Từ chối tour đề xuất của khách hàng"
                    footer={[
                        <Button
                            htmlType="submit"
                            key="submit"
                            type="primary"
                            form="confirm-custom-tour"
                        >
                            Xác nhận
                        </Button>,
                    ]}
                    className="modal-confirm-price"
                >
                    <Form
                        form={form}
                        name="confirm-custom-tours"
                        id="confirm-custom-tour"
                        layout="vertical"
                        onFinish={handleConfirmTourPrice}
                    >
                        <Form.Item
                            name="price"
                            label="Giá tour"
                            rules={[
                                {
                                    required: true,
                                    message: `Vui lòng nhập giá tour`,
                                },
                                {
                                    pattern: DIGIT_VALIDATE,
                                    message:
                                        'Giá tour không phù hợp, vui lòng kiếm tra lại',
                                },
                            ]}
                        >
                            <Input placeholder="Báo giá tour / người" />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
);

ScheduleList.displayName = 'ScheduleList';

export default ScheduleList;
