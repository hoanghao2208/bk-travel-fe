import { memo, useEffect, useRef } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import {
    Form,
    Upload,
    Input,
    DatePicker,
    TimePicker,
    Select,
    Button,
} from 'antd';
import './styles.scss';
import { InboxOutlined, CompassFilled } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Thêm tour du lịch mới';
    });
    const formRef = useRef(null);

    return (
        <AdminLayout>
            <div className="add-new-tour">
                <div className="add-new-tour__header">
                    <h1 className="add-new-tour__header--title">
                        tour du lịch mới
                    </h1>
                    <p className="add-new-tour__header--intro">
                        Vui lòng điền các thông tin bên dưới để có thể hoàn tất
                        việc thêm tour du lịch mới trên hệ thống của bạn
                    </p>
                </div>
                <div className="add-new-tour__content">
                    <Form
                        ref={formRef}
                        name="control-ref"
                        layout="vertical"
                        // onFinish={onFinish}
                    >
                        <div className="add-new-tour__content-inf1">
                            <div className="add-new-tour__content-inf1--item1">
                                <Form.Item
                                    label="Tên tour du lịch"
                                    name="tourname"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tên tour du lịch',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Tên tour du lịch" />
                                </Form.Item>
                            </div>
                            <div className="add-new-tour__content-inf1--item">
                                <Form.Item
                                    label="Tổng số du khách"
                                    name="total-tourist"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tổng số du khách',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Tổng số du khách" />
                                </Form.Item>
                            </div>
                            <div className="add-new-tour__content-inf1--item">
                                <Form.Item
                                    label="Ngày khởi hành"
                                    name="day"
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
                            </div>
                        </div>

                        <div className="add-new-tour__content-inf1">
                            <div className="add-new-tour__content-inf1--item">
                                <Form.Item
                                    name="expire-day"
                                    label="Hạn đặt chổ"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn hạn đặt chổ',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Hạn đặt chổ"
                                        format={DEFAULT_DISPLAY_DATE_FORMAT}
                                    />
                                </Form.Item>
                            </div>
                            <div className="add-new-tour__content-inf1--item">
                                <Form.Item
                                    label="Thời gian khởi hành"
                                    name="time-start"
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
                            <div className="add-new-tour__content-inf1--item">
                                <Form.Item
                                    label="Điểm khởi hành"
                                    name="departure"
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
                            </div>
                            <div className="add-new-tour__content-inf1--item">
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
                                    <Select placeholder="Điểm đến">
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
                            </div>
                        </div>

                        <div className="add-new-tour__content-inf2">
                            <div className="add-new-tour__content-inf2--item1">
                                <Form.Item
                                    label="Ảnh bìa của tour"
                                    name="background"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn điểm đến',
                                        },
                                    ]}
                                >
                                    <Upload.Dragger
                                        listType="picture-card"
                                        // fileList={fileList}
                                        // onChange={handleUpload}
                                        beforeUpload={() => false}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Chọn ảnh bìa của tour
                                        </p>
                                    </Upload.Dragger>
                                </Form.Item>
                                <p className="img-validate">
                                    Định dạng JPG, PNG, JPEG
                                </p>
                            </div>
                            <div className="add-new-tour__content-inf2--item2">
                                <Form.Item
                                    label="Thời gian tour"
                                    name="long"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn thời gian tour',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Thời gian tour">
                                        <Option value="2n1d">
                                            2 ngày, 1 đêm
                                        </Option>
                                        <Option value="3n2d">
                                            3 ngày, 2 đêm
                                        </Option>
                                        <Option value="4n3d">
                                            4 ngày, 3 đêm
                                        </Option>
                                        <Option value="5n4d">
                                            5 ngày, 4 đêm
                                        </Option>
                                    </Select>
                                </Form.Item>
                                <div className="item-btn">
                                    <Button type="primary">
                                        Lên lịch trình
                                    </Button>
                                </div>
                            </div>
                            <div className="add-new-tour__content-inf2--item">
                                <Form.Item
                                    label="Giá tour"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giá tour',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Giá tour" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="add-new-tour__content-inf3">
                            <div className="add-new-tour__content-inf3--item">
                                <Form.Item
                                    name="hightlight"
                                    label="Điểm nhấn tour"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập điểm nhấn của tour',
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        placeholder="Điểm nhấn tour"
                                        style={{ height: 120 }}
                                    />
                                </Form.Item>
                            </div>
                            <div className="add-new-tour__content-inf3--item">
                                <Form.Item
                                    name="notes"
                                    label="Lưu ý về tour du lịch"
                                >
                                    <Input.TextArea
                                        placeholder="Lưu ý về tour du lịch"
                                        style={{ height: 120 }}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="add-new-tour__content-inf4">
                            <Form.Item
                                name="details"
                                label="Chi tiết về tour du lịch"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập chi tiết của tour du lịch',
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Chi tiết về tour du lịch"
                                    style={{ height: 240 }}
                                />
                            </Form.Item>
                        </div>

                        <div className="add-new-tour__content-inf4">
                            <Form.Item
                                name="images-list"
                                label="Các địa điểm du lịch"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng thêm ảnh của địa điểm tham quan',
                                    },
                                ]}
                            >
                                <ImgCrop rotationSlider>
                                    <Upload
                                        listType="picture-card"
                                        // fileList={fileList}
                                        // onChange={onChange}
                                        // onPreview={onPreview}
                                    >
                                        {'+ Thêm'}
                                    </Upload>
                                </ImgCrop>
                            </Form.Item>
                            <p className="img-validate">
                                Định dạng JPG, PNG, JPEG
                            </p>
                        </div>

                        <div className="add-new-tour__content-btn">
                            <Button
                                type="primary"
                                shape="round"
                                icon={<CompassFilled />}
                                size="large"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Add New Tour Inner';

export default Inner;
