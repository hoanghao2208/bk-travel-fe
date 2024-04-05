import { CompassFilled, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Select } from 'antd';
import Message from 'components/Message';
import OutstandingListTour from 'components/OutstandingListTour';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './style.scss';

const Inner = memo(({ allDestinations, handleFindTour }) => {
    useEffect(() => {
        document.title = 'Tìm kiếm tour';
    });
    const navigate = useNavigate();

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

    const onFinish = useCallback(
        values => {
            if (Object.values(values).every(value => value === undefined)) {
                Message.sendWarning('Phải ít nhất một trường mang giá trị', 5);
                return;
            }
            handleFindTour(values);
        },
        [handleFindTour]
    );

    return (
        <UserHomePageLayout>
            <div className="find-tour-wrapper">
                <div className="find-tour">
                    <div className="find-tour__header">
                        <h3 className="find-tour__header--title">
                            Tìm kiếm tour
                        </h3>
                        <p className="find-tour__header--intro">
                            Vui lòng lựa chọn điểm đi, điểm đến và thời gian phù
                            hợp với bạn
                        </p>
                    </div>
                    <div className="find-tour__form">
                        <Form
                            name="find-tour"
                            layout="vertical"
                            id="find-tour"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="departure_place"
                                label="Điểm khởi hành"
                            >
                                <Select placeholder="Điểm khởi hành">
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
                                name="destination_place"
                                label="Điểm đến"
                            >
                                <Select placeholder="Điểm đến">
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
                                name="departure_date"
                                label="Ngày khởi hành"
                            >
                                <DatePicker
                                    placeholder="Ngày khởi hành"
                                    format={DEFAULT_DISPLAY_DATE_FORMAT}
                                />
                            </Form.Item>
                            <Form.Item name="time" label="Thời gian tour">
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
                        </Form>
                    </div>
                    <div className="find-tour__button">
                        <Button
                            type="default"
                            shape="round"
                            icon={<PlusOutlined />}
                            size="large"
                            onClick={() => navigate(routeConstants.CUSTOM_TOUR)}
                        >
                            Tạo tour của riêng bạn
                        </Button>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<CompassFilled />}
                            size="large"
                            htmlType="submit"
                            form="find-tour"
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </div>
            <div className="find-tour__outstanding">
                <OutstandingListTour />
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Find Tour Inner';

export default Inner;
