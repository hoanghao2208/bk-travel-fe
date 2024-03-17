import { CompassFilled, InboxOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Image,
    Input,
    Select,
    Spin,
    TimePicker,
    Tooltip,
    Upload,
} from 'antd';
import axios from 'axios';
import Message from 'components/Message';
import dayjs from 'dayjs';
import AdminLayout from 'layouts/AdminLayout';
import moment from 'moment';
import { memo, useCallback, useEffect, useState } from 'react';
import {
    DEFAULT_DISPLAY_DATE_FORMAT,
    DIGIT_VALIDATE,
    TIME_FORMAT,
} from 'utils/constants';
import './styles.scss';

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

const Inner = memo(
    ({
        handleEditedTour,
        tourData,
        form,
        loading,
        fileList,
        setFileList,
        imgURL,
        setImgURL,
        showUpload,
        setShowUpload,
        departureDate,
        setDepartureDate,
    }) => {
        useEffect(() => {
            document.title = 'Chỉnh sửa thông tin tour';
        });

        useState(false);
        const [departureTime, setDepartureTime] = useState('');
        const [deadlineDate, setDeadlineDate] = useState('');
        const [currentError, setCurrentError] = useState('');
        const [attractions, setAttractions] = useState([]);

        const onChangeDepartureDate = (_, dateString) => {
            const formattedDate = moment(
                dateString,
                DEFAULT_DISPLAY_DATE_FORMAT
            ).format('YYYY-MM-DD');
            setDepartureDate(formattedDate);
        };

        const onChangeDeadlineDate = (_, dateString) => {
            const formattedDate = moment(
                dateString,
                DEFAULT_DISPLAY_DATE_FORMAT
            ).format('YYYY-MM-DD');
            setDeadlineDate(formattedDate);
        };

        const onChangeTime = (_, timeString) => {
            setDepartureTime(timeString);
        };

        const getAttractions = useCallback(() => {
            if (tourData?.destination) {
                const attractionNames = tourData.destination.attractions.map(
                    attraction => attraction.name
                );
                setAttractions(attractionNames);
            }
        }, [tourData]);

        useEffect(() => {
            getAttractions();
        }, [getAttractions]);

        const handleBeforeUpload = file => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const isAllowedType = allowedTypes.includes(file.type);
            const maxSize = 10 * 1024 * 1024;
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

        const getImageByURL = async url => {
            try {
                const response = await axios.get(url, {
                    responseType: 'blob',
                });
                const contentType = response.headers['content-type'];
                const fileName = url.substring(url.lastIndexOf('/') + 1);
                return new File([response.data], fileName, {
                    type: contentType,
                });
            } catch (error) {
                console.error(error);
            }
        };

        useEffect(() => {
            if (imgURL) {
                getImageByURL(imgURL).then(file => {
                    if (file) {
                        setFileList(file);
                    } else {
                        console.error('Failed to download image.');
                    }
                });
            }
        }, [imgURL, setFileList]);

        const handleSubmitEditTour = values => {
            const tourData = {
                ...values,
                departure_date: departureDate,
                departure_time: departureTime,
                deadline_book_time: deadlineDate,
                cover_image: fileList,
            };

            handleEditedTour(tourData);
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
                                Chỉnh sửa thông tin tour du lịch
                            </h1>
                            <p className="add-new-tour__header--intro">
                                Vui lòng chỉnh sửa các thông tin cần thiết để có
                                thể hoàn tất việc chỉnh sửa thông tin tour trên
                                hệ thống của bạn
                            </p>
                        </div>
                        {tourData?.name && attractions.length > 0 && (
                            <div className="add-new-tour__content">
                                <Form
                                    form={form}
                                    name="edit-tour"
                                    layout="vertical"
                                    onFinish={handleSubmitEditTour}
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
                                                initialValue={tourData.name}
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
                                                initialValue={
                                                    tourData.max_customer
                                                }
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
                                                initialValue={dayjs(
                                                    tourData.departure_date
                                                )}
                                            >
                                                <DatePicker
                                                    placeholder="Ngày khởi hành"
                                                    format={
                                                        DEFAULT_DISPLAY_DATE_FORMAT
                                                    }
                                                    minDate={dayjs()}
                                                    onChange={
                                                        onChangeDepartureDate
                                                    }
                                                    allowClear={false}
                                                    defaultValue={dayjs(
                                                        tourData.departure_date
                                                    )}
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
                                                initialValue={dayjs(
                                                    tourData.departure_time,
                                                    TIME_FORMAT
                                                )}
                                            >
                                                <TimePicker
                                                    placeholder="Thời gian khởi hành"
                                                    format={TIME_FORMAT}
                                                    onChange={onChangeTime}
                                                    defaultValue={dayjs(
                                                        tourData.departure_time,
                                                        TIME_FORMAT
                                                    )}
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
                                                initialValue={dayjs(
                                                    tourData.deadline_book_time
                                                )}
                                            >
                                                <DatePicker
                                                    placeholder="Hạn đặt chổ"
                                                    format={
                                                        DEFAULT_DISPLAY_DATE_FORMAT
                                                    }
                                                    onChange={
                                                        onChangeDeadlineDate
                                                    }
                                                    allowClear={false}
                                                    minDate={dayjs()}
                                                    defaultValue={dayjs(
                                                        tourData.deadline_book_time
                                                    )}
                                                    disabledDate={current =>
                                                        current &&
                                                        current >
                                                            moment(
                                                                departureDate
                                                            )
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
                                                initialValue={
                                                    tourData.departure_place
                                                }
                                            >
                                                <Select
                                                    placeholder="Điểm khởi hành"
                                                    defaultValue={
                                                        tourData.departure_place
                                                    }
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
                                                initialValue={
                                                    tourData.destination.name
                                                }
                                            >
                                                <Select
                                                    placeholder="Điểm đến"
                                                    mode="multiple"
                                                    allowClear="false"
                                                    disabled
                                                    defaultValue={
                                                        tourData.destination
                                                            .name
                                                    }
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
                                                // rules={[
                                                //     {
                                                //         required: true,
                                                //         message:
                                                //             'Vui lòng chọn ảnh bìa của tour',
                                                //     },
                                                // ]}
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
                                                            Chọn ảnh bìa của
                                                            tour
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
                                                        onClick={
                                                            handleDeleteImg
                                                        }
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
                                                initialValue={attractions}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    placeholder="Địa điểm du lịch"
                                                    options={options}
                                                    disabled
                                                    defaultValue={attractions}
                                                    maxTagCount="responsive"
                                                    maxTagPlaceholder={omittedValues => (
                                                        <Tooltip
                                                            title={omittedValues
                                                                .map(
                                                                    ({
                                                                        label,
                                                                    }) => label
                                                                )
                                                                .join(', ')}
                                                        >
                                                            <span>...</span>
                                                        </Tooltip>
                                                    )}
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
                                                initialValue={tourData.time}
                                            >
                                                <Select
                                                    placeholder="Thời gian tour"
                                                    defaultValue={tourData.time}
                                                >
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
                                                initialValue={tourData.price}
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
                                                initialValue={
                                                    tourData.highlight
                                                }
                                            >
                                                <Input.TextArea
                                                    placeholder="Điểm nhấn tour"
                                                    style={{ height: 150 }}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="add-new-tour__content-inf3--item">
                                            <Form.Item
                                                name="note"
                                                label="Lưu ý về tour du lịch"
                                                initialValue={tourData.note}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập lưu ý của tour',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea
                                                    placeholder="Lưu ý về tour du lịch"
                                                    style={{ height: 150 }}
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
                                            initialValue={tourData.description}
                                        >
                                            <Input.TextArea
                                                placeholder="Chi tiết về tour du lịch"
                                                style={{ height: 240 }}
                                            />
                                        </Form.Item>
                                    </div>

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
                        )}
                    </div>
                </AdminLayout>
            </Spin>
        );
    }
);

Inner.displayName = 'Admin Edit Tour Inner';

export default Inner;
