import { CaretLeftOutlined, CompassFilled } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    Spin,
    TimePicker,
    Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import moment from 'moment';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerId } from 'reducers/token/function';
import tourService from 'services/tourService';
import { DEFAULT_DISPLAY_DATE_FORMAT, TIME_FORMAT } from 'utils/constants';
import './style.scss';

const Inner = memo(
    ({ form, allDestinations, loading, handleCreateCustomTour }) => {
        useEffect(() => {
            document.title = 'Tạo tour của riêng bạn';
        });
        const navigate = useNavigate();
        const userId = getCustomerId();

        const [listAttractions, setListAttractions] = useState([]);
        const [destinationPlaces, setDestinationPlaces] = useState([]);
        const [departureDate, setDepartureDate] = useState('');
        const [departureTime, setDepartureTime] = useState('');

        const filterOption = (input, option) =>
            (option?.children ?? '')
                .toLowerCase()
                .includes(input.toLowerCase());

        const onChangeDepartureDate = (_, dateString) => {
            const formattedDate = moment(
                dateString,
                DEFAULT_DISPLAY_DATE_FORMAT
            ).format('YYYY-MM-DD');
            setDepartureDate(formattedDate);
        };

        const onChangeTime = (_, timeString) => {
            setDepartureTime(timeString);
        };

        const getAttractionsFromDestinationPlaces = useCallback(async () => {
            const options = [];
            for (const destination of destinationPlaces) {
                try {
                    const response = await tourService.getAllAttractions(
                        destination
                    );
                    if (response.status === 200) {
                        const attractions = response.data.data.map(item => ({
                            label: item.name,
                            value: item.name,
                        }));
                        options.push({
                            label: destination,
                            options: attractions,
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            return options;
        }, [destinationPlaces]);

        const handleChangeDestination = values => {
            form.resetFields(['attractions']);
            setDestinationPlaces(values);
        };

        const timeOptions = useMemo(() => {
            const timeOpts = [];
            for (let i = 0; i < 10; i++) {
                let newOpt;
                if (i === 0) {
                    newOpt = {
                        value: `${i + 1} ngày`,
                    };
                } else {
                    newOpt = {
                        value: `${i + 1} ngày, ${i} đêm`,
                    };
                }
                timeOpts.push(newOpt);
            }
            return timeOpts;
        }, []);

        useEffect(() => {
            const getAttractions = async () => {
                const options = await getAttractionsFromDestinationPlaces();
                setListAttractions(options);
            };

            getAttractions();
        }, [getAttractionsFromDestinationPlaces]);

        const handleConfirmCustomTour = useCallback(
            values => {
                const customTourData = {
                    ...values,
                    departure_date: departureDate,
                    departure_time: departureTime,
                    max_number: parseInt(values.max_number),
                    user_id: userId,
                };

                handleCreateCustomTour(customTourData);
            },
            [departureDate, departureTime, handleCreateCustomTour, userId]
        );

        return (
            <Spin tip="Vui lòng chờ" spinning={loading}>
                <UserHomePageLayout>
                    <div className="custom-tour-wrapper">
                        <div className="custom-tour">
                            <div className="custom-tour__header">
                                <h3 className="custom-tour__header--title">
                                    Tạo tour của riêng bạn
                                </h3>
                                <p className="custom-tour__header--intro">
                                    Chức năng này có thể giúp bạn đề xuất tour
                                    du lịch theo sở thích của bạn với Quản trị
                                    viên của hệ thống. Nếu Quản trị viên thấy
                                    phù hợp, họ sẽ xác nhận và báo giá chi tiết
                                    cho bạn trong khoảng thời gian sớm nhất. Vui
                                    lòng điền đầy đủ các thông tin bên dưới để
                                    hoàn tất việc tạo tour riêng cho chính bạn.
                                </p>
                            </div>
                            <div className="custom-tour__form">
                                <Form
                                    form={form}
                                    name="custom-tour"
                                    layout="vertical"
                                    id="custom-tour"
                                    onFinish={handleConfirmCustomTour}
                                >
                                    <div className="custom-tour__form--form1">
                                        <Form.Item
                                            name="departure_place"
                                            label="Điểm khởi hành"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn điểm khởi hành',
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Điểm khởi hành"
                                                filterOption={filterOption}
                                            >
                                                {allDestinations.map(
                                                    destination => (
                                                        <Option
                                                            key={
                                                                destination.destination_id
                                                            }
                                                            value={
                                                                destination.name
                                                            }
                                                        >
                                                            {destination.name}
                                                        </Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Điểm đến"
                                            name="destination_places"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn điểm đến',
                                                },
                                            ]}
                                        >
                                            <Select
                                                allowClear
                                                mode="multiple"
                                                onChange={
                                                    handleChangeDestination
                                                }
                                                placeholder="Điểm đến"
                                                filterOption={filterOption}
                                                maxTagCount="responsive"
                                                maxTagPlaceholder={omittedValues => (
                                                    <Tooltip
                                                        title={omittedValues
                                                            .map(
                                                                ({ label }) =>
                                                                    label
                                                            )
                                                            .join(', ')}
                                                    >
                                                        <span>...</span>
                                                    </Tooltip>
                                                )}
                                            >
                                                {allDestinations.map(
                                                    destination => (
                                                        <Option
                                                            key={
                                                                destination.destination_id
                                                            }
                                                            value={
                                                                destination.name
                                                            }
                                                        >
                                                            {destination.name}
                                                        </Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="departure_date"
                                            label="Ngày khởi hành"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn ngày khởi hành',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                placeholder="Ngày khởi hành"
                                                minDate={dayjs().add(3, 'day')}
                                                format={
                                                    DEFAULT_DISPLAY_DATE_FORMAT
                                                }
                                                onChange={onChangeDepartureDate}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="departure_time"
                                            label="Thời gian khởi hành"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn thời gian khởi hành',
                                                },
                                            ]}
                                        >
                                            <TimePicker
                                                placeholder="Thời gian khởi hành"
                                                format={TIME_FORMAT}
                                                onChange={onChangeTime}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="custom-tour__form--form2">
                                        <Form.Item
                                            name="time"
                                            label="Thời gian tour"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn thời gian tour',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Thời gian tour">
                                                {timeOptions.map(item => (
                                                    <Option
                                                        key={item.value}
                                                        value={item.value}
                                                    >
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Tổng số du khách"
                                            name="max_number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng nhập số du khách trong đoàn',
                                                },
                                                {
                                                    pattern: /^[0-9]+$/,
                                                    message:
                                                        'Ký tự bạn vừa nhập không hợp lệ',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Tổng số du khách" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Địa điểm du lịch"
                                            name="attractions"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng lựa chọn các điểm du lịch mà bạn mong muốn',
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Địa điểm du lịch"
                                                options={listAttractions}
                                                disabled={
                                                    destinationPlaces.length ===
                                                    0
                                                }
                                                maxTagCount="responsive"
                                                maxTagPlaceholder={omittedValues => (
                                                    <Tooltip
                                                        title={omittedValues
                                                            .map(
                                                                ({ label }) =>
                                                                    label
                                                            )
                                                            .join(', ')}
                                                    >
                                                        <span>...</span>
                                                    </Tooltip>
                                                )}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="custom-tour__form--form3">
                                        <Form.Item name="note" label="Ghi chú">
                                            <Input.TextArea
                                                placeholder="Ghi chú"
                                                style={{ height: 120 }}
                                            />
                                        </Form.Item>
                                    </div>
                                </Form>
                                <div className="custom-tour__button">
                                    <Button
                                        type="default"
                                        shape="round"
                                        icon={<CaretLeftOutlined />}
                                        size="large"
                                        onClick={() => navigate('/find-tour')}
                                    >
                                        Quay lại
                                    </Button>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        shape="round"
                                        icon={<CompassFilled />}
                                        size="large"
                                        form="custom-tour"
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </UserHomePageLayout>
            </Spin>
        );
    }
);

Inner.displayName = 'Custom Tour Inner';

export default Inner;
