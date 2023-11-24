import { memo, useEffect, useRef } from 'react';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { Form, Select, DatePicker, Button, TimePicker, Input } from 'antd';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import { CompassFilled, CaretLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Tạo tour của riêng bạn';
    });
    const navigate = useNavigate();
    const options = [
        {
            label: 'TP. Hồ Chí Minh',
            value: 'tphcm',
        },
        {
            label: 'Đà Nẵng',
            value: 'dn',
        },
        {
            label: 'Hà Nội',
            value: 'hn',
        },
        {
            label: 'TP. Phan Thiết',
            value: 'pt',
        },
    ];
    const formRef = useRef(null);

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
                            ref={formRef}
                            name="control-ref"
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
                                    <Select placeholder="Điểm khởi hành">
                                        <Option value="hochiminh">
                                            TP. Hồ Chí Minh
                                        </Option>
                                        <Option value="danang">Đà Nẵng</Option>
                                        <Option value="hanoi">Hà Nội</Option>
                                        <Option value="vungtau">
                                            Vũng Tàu
                                        </Option>
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
                                        mode="multiple"
                                        allowClear
                                        placeholder="Điểm đến"
                                        options={options}
                                    />
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
                                    <TimePicker placeholder="Thời gian khởi hành" />
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
                                        <Option value="1day">1 ngày</Option>
                                        <Option value="2day">
                                            2 ngày, 1 đêm
                                        </Option>
                                        <Option value="3day">
                                            3 ngày, 2 đêm
                                        </Option>
                                        <Option value="4day">
                                            4 ngày, 3 đêm
                                        </Option>
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
                                    label="Địa điểm vui chơi"
                                    name="locations"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng lựa chọn các điểm vui chơi mà bạn mong muốn',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        placeholder="Địa điểm vui chơi"
                                        options={options}
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
