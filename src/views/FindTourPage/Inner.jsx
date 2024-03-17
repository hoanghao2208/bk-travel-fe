import { CompassFilled, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Select } from 'antd';
import OutstandingListTour from 'components/OutstandingListTour';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import routeConstants from 'route/routeConstant';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Tìm kiếm tour';
    });
    const formRef = useRef(null);
    const navigate = useNavigate();
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
                            ref={formRef}
                            name="control-ref"
                            layout="vertical"
                            // onFinish={onFinish}
                        >
                            <Form.Item
                                name="departure"
                                label="Điểm khởi hành"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn điểm khởi hành',
                                    },
                                ]}
                            >
                                <Select placeholder="Điểm khởi hành">
                                    <Option value="hochiminh">
                                        TP. Hồ Chí Minh
                                    </Option>
                                    <Option value="danang">Đà Nẵng</Option>
                                    <Option value="hanoi">Hà Nội</Option>
                                    <Option value="vungtau">Vũng Tàu</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="destination"
                                label="Điểm đến"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn điểm đến',
                                    },
                                ]}
                            >
                                <Select placeholder="Điểm đến">
                                    <Option value="hochiminh">
                                        TP. Hồ Chí Minh
                                    </Option>
                                    <Option value="danang">Đà Nẵng</Option>
                                    <Option value="hanoi">Hà Nội</Option>
                                    <Option value="vungtau">Vũng Tàu</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="time"
                                label="Ngày khởi hành"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày khởi hành',
                                    },
                                ]}
                            >
                                <DatePicker
                                    placeholder="Ngày khởi hành"
                                    format={DEFAULT_DISPLAY_DATE_FORMAT}
                                />
                            </Form.Item>
                            <Form.Item
                                name="length-time"
                                label="Thời gian tour"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn thời gian tour',
                                    },
                                ]}
                            >
                                <Select placeholder="Thời gian tour">
                                    <Option value="1day">1 ngày</Option>
                                    <Option value="2day">2 ngày, 1 đêm</Option>
                                    <Option value="3day">3 ngày, 2 đêm</Option>
                                    <Option value="4day">4 ngày, 3 đêm</Option>
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
