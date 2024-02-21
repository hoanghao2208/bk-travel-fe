import { memo, useEffect, useState } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import {
    Form,
    Upload,
    Input,
    DatePicker,
    TimePicker,
    Select,
    Button,
    Image,
    Spin,
} from 'antd';
import './styles.scss';
import { InboxOutlined, CompassFilled } from '@ant-design/icons';
import Message from 'components/Message';
import {
    DEFAULT_DISPLAY_DATE_FORMAT,
    DIGIT_VALIDATE,
    TIME_FORMAT,
} from 'utils/constants';
import moment from 'moment';
import dayjs from 'dayjs';

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

const Inner = memo(
    ({
        handleCreateNewTour,
        formRef,
        form,
        loading,
        fileList,
        setFileList,
    }) => {
        useEffect(() => {
            document.title = 'Thêm tour du lịch mới';
        });

        const [departureDate, setDepartureDate] = useState('');
        const [departureDateSelected, setDepartureDateSelected] =
            useState(false);
        const [departureTime, setDepartureTime] = useState('');
        const [deadlineDate, setDeadlineDate] = useState('');
        const [showUpload, setShowUpload] = useState(true);
        const [imgURL, setImgURL] = useState('');
        const [currentError, setCurrentError] = useState('');

        const onChangeDepartureDate = (_, dateString) => {
            const formattedDate = moment(dateString, 'DD/MM/YYYY').format(
                'YYYY-MM-DD'
            );
            setDepartureDate(formattedDate);
            setDepartureDateSelected(true);
        };

        const onChangeDeadlineDate = (_, dateString) => {
            const formattedDate = moment(dateString, 'DD/MM/YYYY').format(
                'YYYY-MM-DD'
            );
            setDeadlineDate(formattedDate);
        };

        const onChangeTime = (_, timeString) => {
            setDepartureTime(timeString);
        };

        const handleBeforeUpload = file => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const isAllowedType = allowedTypes.includes(file.type);
            const maxSize = 5 * 1024 * 1024;
            const isWithinSizeLimit = file.size <= maxSize;

            if (!isAllowedType || !isWithinSizeLimit) {
                setCurrentError(
                    !isAllowedType
                        ? 'Định dạng file không phù hợp'
                        : 'File vượt quá kích thước cho phép'
                );
                return false;
            }

            return true;
        };

        const handleUploadCoverImg = ({ fileList }) => {
            if (fileList) {
                const isFileValid = handleBeforeUpload(
                    fileList[0].originFileObj
                );

                if (!isFileValid) {
                    setCurrentError('');
                    return;
                }

                setFileList(fileList);
                const imageURL = URL.createObjectURL(fileList[0].originFileObj);
                setImgURL(imageURL);
                setShowUpload(false);
            }
        };

        const handleDeleteImg = () => {
            setImgURL('');
            setShowUpload(true);
            setFileList([]);
        };

        const handleSubmitNewTour = values => {
            const tourData = {
                ...values,
                departure_date: departureDate,
                departure_time: departureTime,
                deadline_book_time: deadlineDate,
                cover_image: fileList[0].originFileObj,
            };

            handleCreateNewTour(tourData);
        };

        useEffect(() => {
            if (currentError !== '') {
                Message.sendError(currentError, 5);
            }
        }, [currentError]);

        return (
            <Spin tip="Vui lòng chờ" size="large" spinning={loading}>
                <AdminLayout>
                    <div className="add-new-tour">
                        <div className="add-new-tour__header">
                            <h1 className="add-new-tour__header--title">
                                tour du lịch mới
                            </h1>
                            <p className="add-new-tour__header--intro">
                                Vui lòng điền các thông tin bên dưới để có thể
                                hoàn tất việc thêm tour du lịch mới trên hệ
                                thống của bạn
                            </p>
                        </div>
                        <div className="add-new-tour__content">
                            <Form
                                form={form}
                                ref={formRef}
                                name="control-ref"
                                layout="vertical"
                                onFinish={handleSubmitNewTour}
                            >
                                <div className="add-new-tour__content-inf1">
                                    <div className="add-new-tour__content-inf1--item1">
                                        <Form.Item
                                            label="Tên tour du lịch"
                                            name="name"
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
                                            name="max_customer"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng nhập tổng số du khách',
                                                },
                                                {
                                                    pattern: DIGIT_VALIDATE,
                                                    message:
                                                        'Số lượng du khách không phù hợp, vui lòng kiếm tra lại',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Tổng số du khách" />
                                        </Form.Item>
                                    </div>
                                    <div className="add-new-tour__content-inf1--item">
                                        <Form.Item
                                            label="Ngày khởi hành"
                                            name="departure_date"
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
                                                format={
                                                    DEFAULT_DISPLAY_DATE_FORMAT
                                                }
                                                minDate={dayjs()}
                                                onChange={onChangeDepartureDate}
                                                allowClear={false}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="add-new-tour__content-inf1">
                                    <div className="add-new-tour__content-inf1--item">
                                        <Form.Item
                                            label="Thời gian khởi hành"
                                            name="departure_time"
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
                                    <div className="add-new-tour__content-inf1--item">
                                        <Form.Item
                                            name="deadline_book_time"
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
                                                format={
                                                    DEFAULT_DISPLAY_DATE_FORMAT
                                                }
                                                onChange={onChangeDeadlineDate}
                                                allowClear={false}
                                                minDate={dayjs()}
                                                disabled={
                                                    !departureDateSelected
                                                }
                                                disabledDate={current =>
                                                    current &&
                                                    current >
                                                        moment(departureDate)
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="add-new-tour__content-inf1--item">
                                        <Form.Item
                                            label="Điểm khởi hành"
                                            name="departure_place"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn điểm khởi hành',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Điểm khởi hành">
                                                <Option value="TP. Hồ Chí Minh">
                                                    TP. Hồ Chí Minh
                                                </Option>
                                                <Option value="Đà Nẵng">
                                                    Đà Nẵng
                                                </Option>
                                                <Option value="Hà Nội">
                                                    Hà Nội
                                                </Option>
                                                <Option value="Vũng Tàu">
                                                    Vũng Tàu
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="add-new-tour__content-inf1--item">
                                        <Form.Item
                                            label="Điểm đến"
                                            name="destination_place"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn điểm đến',
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Điểm đến"
                                                mode="multiple"
                                                allowClear
                                            >
                                                <Option value="TP. Hồ Chí Minh">
                                                    TP. Hồ Chí Minh
                                                </Option>
                                                <Option value="Đà Nẵng">
                                                    Đà Nẵng
                                                </Option>
                                                <Option value="Hà Nội">
                                                    Hà Nội
                                                </Option>
                                                <Option value="Vũng Tàu">
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
                                            name="cover_image"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn ảnh bìa của tour',
                                                },
                                            ]}
                                        >
                                            {showUpload === false ? (
                                                <Image
                                                    width="100%"
                                                    src={imgURL}
                                                />
                                            ) : (
                                                <Upload.Dragger
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onChange={
                                                        handleUploadCoverImg
                                                    }
                                                    beforeUpload={
                                                        handleBeforeUpload
                                                    }
                                                >
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">
                                                        Chọn ảnh bìa của tour
                                                    </p>
                                                </Upload.Dragger>
                                            )}
                                        </Form.Item>
                                        <div className="upload-footer">
                                            <p className="img-validate">
                                                Định dạng JPG, PNG, JPEG
                                            </p>
                                            {showUpload === false && (
                                                <Button
                                                    danger
                                                    type="primary"
                                                    onClick={handleDeleteImg}
                                                >
                                                    Xóa ảnh
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="add-new-tour__content-inf2">
                                    <div className="add-new-tour__content-inf1--item1">
                                        <Form.Item
                                            label="Địa điểm du lịch"
                                            name="attractions"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn địa điểm du lịch',
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Địa điểm du lịch"
                                                options={options}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="add-new-tour__content-inf2--item2">
                                        <Form.Item
                                            label="Thời gian tour"
                                            name="time"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng chọn thời gian tour',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Thời gian tour">
                                                <Option value="2 ngày, 1 đêm">
                                                    2 ngày, 1 đêm
                                                </Option>
                                                <Option value="3 ngày, 2 đêm">
                                                    3 ngày, 2 đêm
                                                </Option>
                                                <Option value="4 ngày, 3 đêm">
                                                    4 ngày, 3 đêm
                                                </Option>
                                                <Option value="5 ngày, 4 đêm">
                                                    5 ngày, 4 đêm
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="add-new-tour__content-inf2--item">
                                        <Form.Item
                                            label="Giá tour"
                                            name="price"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng nhập giá tour',
                                                },
                                                {
                                                    pattern: DIGIT_VALIDATE,
                                                    message:
                                                        'Giá tour không phù hợp, vui lòng kiếm tra lại',
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
                                            name="highlight"
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
                                            name="note"
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
                                        name="description"
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

                                {/* <div className="add-new-tour__content-inf4">
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
                        </div> */}

                                <div className="add-new-tour__content-btn">
                                    <Button
                                        type="primary"
                                        shape="round"
                                        icon={<CompassFilled />}
                                        size="large"
                                        htmlType="submit"
                                        disabled={loading}
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </AdminLayout>
            </Spin>
        );
    }
);

Inner.displayName = 'Admin Add New Tour Inner';

export default Inner;
