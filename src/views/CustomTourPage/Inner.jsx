import { CaretLeftOutlined, CompassFilled } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    TimePicker,
    Tooltip,
} from 'antd';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tourService from 'services/tourService';
import { DEFAULT_DISPLAY_DATE_FORMAT, TIME_FORMAT } from 'utils/constants';
import './style.scss';

const Inner = memo(({ allDestinations }) => {
    useEffect(() => {
        document.title = 'Tạo tour của riêng bạn';
    });
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [listAttractions, setListAttractions] = useState([]);
    const [destinationPlaces, setDestinationPlaces] = useState([]);
    const [allAttractions, setAllAttractions] = useState([]);

    const filterOption = (input, option) =>
        (option?.children ?? '').toLowerCase().includes(input.toLowerCase());

    const handleChangeAttractions = (values, options) => {
        const selectedAttractions = [];
        const all_attractions = [];
        let prevPlace = null;
        let i = 0;

        values.forEach(value => {
            options.forEach(option => {
                option.options.forEach(attraction => {
                    if (attraction.value === value) {
                        selectedAttractions.push({
                            label: attraction.label,
                            place: option.label,
                        });
                    }
                });
            });
        });

        selectedAttractions.sort((a, b) => {
            if (a.place > b.place) {
                return -1;
            }
            if (a.place < b.place) {
                return 1;
            }
            return 0;
        });

        selectedAttractions.forEach(attraction => {
            if (prevPlace !== attraction.place) {
                i = 0;
            }

            const attractionKey = `attractions[${i}][${attraction.place}]`;
            const attractionValue = attraction.label;
            const attractionObj = {};
            attractionObj[attractionKey] = attractionValue;
            all_attractions.push(attractionObj);

            prevPlace = attraction.place;
            i++;
        });

        setAllAttractions(all_attractions);
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

    const handleGenerateTimeOptions = useMemo(() => {
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

    return (
        <UserHomePageLayout>
            <div className="custom-tour-wrapper">
                <div className="custom-tour">
                    <div className="custom-tour__header">
                        <h3 className="custom-tour__header--title">
                            Tạo tour của riêng bạn
                        </h3>
                        <p className="custom-tour__header--intro">
                            Chức năng này có thể giúp bạn đề xuất tour du lịch
                            theo sở thích của bạn với Quản trị viên của hệ
                            thống. Nếu Quản trị viên thấy phù hợp, họ sẽ xác
                            nhận và báo giá chi tiết cho bạn trong khoảng thời
                            gian sớm nhất. Vui lòng điền đầy đủ các thông tin
                            bên dưới để hoàn tất việc tạo tour riêng cho chính
                            bạn.
                        </p>
                    </div>
                    <div className="custom-tour__form">
                        <Form
                            form={form}
                            name="custom-tour"
                            layout="vertical"
                            // onFinish={onFinish}
                        >
                            <div className="custom-tour__form--form1">
                                <Form.Item
                                    name="departure"
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
                                        {allDestinations.map(destination => (
                                            <Option
                                                key={destination.destination_id}
                                                value={destination.name}
                                            >
                                                {destination.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Điểm đến"
                                    name="destination"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn điểm đến',
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        mode="multiple"
                                        onChange={handleChangeDestination}
                                        placeholder="Điểm đến"
                                        filterOption={filterOption}
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
                                    >
                                        {allDestinations.map(destination => (
                                            <Option
                                                key={destination.destination_id}
                                                value={destination.name}
                                            >
                                                {destination.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="day"
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
                                        format={DEFAULT_DISPLAY_DATE_FORMAT}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="time"
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
                                    />
                                </Form.Item>
                            </div>
                            <div className="custom-tour__form--form2">
                                <Form.Item
                                    name="length-time"
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
                                        {handleGenerateTimeOptions.map(
                                            item => (
                                                <Option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.value}
                                                </Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Tổng số du khách"
                                    name="total-guests"
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
                                    name="locations"
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
                                            destinationPlaces.length === 0
                                        }
                                        onChange={values =>
                                            handleChangeAttractions(
                                                values,
                                                listAttractions
                                            )
                                        }
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
                            <div className="custom-tour__form--form3">
                                <Form.Item name="notes" label="Ghi chú">
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
                                type="primary"
                                shape="round"
                                icon={<CompassFilled />}
                                size="large"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Custom Tour Inner';

export default Inner;
