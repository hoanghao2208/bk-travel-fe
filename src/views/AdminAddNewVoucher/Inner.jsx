import { CompassFilled, InboxOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Image, Input, Select, Upload } from 'antd';
import Message from 'components/Message';
import dayjs from 'dayjs';
import AdminLayout from 'layouts/AdminLayout';
import moment from 'moment';
import { memo, useCallback, useEffect, useState } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT, DIGIT_VALIDATE } from 'utils/constants';
import './styles.scss';

const Inner = memo(
    ({
        form,
        fileList,
        setFileList,
        imgURL,
        setImgURL,
        reduceCost,
        setReduceCost,
        minCost,
        setMinCost,
        showUpload,
        setShowUpload,
        handleCreateNewVoucher,
    }) => {
        useEffect(() => {
            document.title = 'Thêm ưu đãi mới';
        });

        const [startDate, setStartDate] = useState('');
        const [expiredDate, setExpiredDate] = useState('');

        const [selectedStartDate, setSelectedStartDate] = useState(false);

        const [currentError, setCurrentError] = useState('');

        const onChangeStartDate = (_, dateString) => {
            const formattedDate = moment(
                dateString,
                DEFAULT_DISPLAY_DATE_FORMAT
            ).format('YYYY-MM-DD');
            setStartDate(formattedDate);
            setSelectedStartDate(true);
        };

        const onChangeExpiredDate = (_, dateString) => {
            const formattedDate = moment(
                dateString,
                DEFAULT_DISPLAY_DATE_FORMAT
            ).format('YYYY-MM-DD');
            setExpiredDate(formattedDate);
        };

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

        const disabledExpiredDate = current => {
            if (!startDate || current < moment(startDate)) {
                return true;
            }
            return false;
        };

        const onChangeReduceCost = useCallback(
            e => {
                let val = e.target.value;
                val = val.replace(/\D/g, '');
                val = Number(val).toLocaleString();

                setReduceCost(val);
            },
            [setReduceCost]
        );

        const onChangeMinCost = useCallback(
            e => {
                let val = e.target.value;
                val = val.replace(/\D/g, '');
                val = Number(val).toLocaleString();

                setMinCost(val);
            },
            [setMinCost]
        );

        const handleSubmitNewVoucher = useCallback(
            values => {
                const { type } = values;
                const reducePrice = Number(reduceCost.replace(/\./g, ''));
                const minPrice = Number(minCost.replace(/\./g, ''));
                const voucherData = {
                    ...values,
                    start_date: startDate,
                    expired_date: expiredDate,
                    value_discount:
                        type === 'fixed' ? reducePrice : reducePrice / 100,
                    image: fileList[0].originFileObj,
                    min_order_value: minPrice,
                };

                if (voucherData.value_discount === 0) {
                    Message.sendWarning(
                        'Giá giảm không phù hợp, vui lòng kiếm tra lại'
                    );
                    return;
                }
                if (voucherData.min_order_value === 0) {
                    Message.sendWarning(
                        'Giá trị đơn tối thiểu không phù hợp, vui lòng kiếm tra lại'
                    );
                    return;
                }
                handleCreateNewVoucher(voucherData);
            },
            [
                expiredDate,
                fileList,
                handleCreateNewVoucher,
                minCost,
                reduceCost,
                startDate,
            ]
        );

        useEffect(() => {
            if (currentError !== '') {
                Message.sendError(currentError, 5);
            }
        }, [currentError]);

        return (
            <AdminLayout>
                <div className="add-new-voucher">
                    <div className="add-new-voucher__header">
                        <h1 className="add-new-voucher__header--title">
                            thêm ưu đãi mới
                        </h1>
                        <p className="add-new-voucher__header--intro">
                            Vui lòng điền các thông tin bên dưới để có thể hoàn
                            tất việc thêm ưu đãi mới trên hệ thống của bạn.
                        </p>
                    </div>
                    <div className="add-new-voucher__content">
                        <Form
                            form={form}
                            name="add-new-voucher"
                            layout="vertical"
                            onFinish={handleSubmitNewVoucher}
                            autoComplete="off"
                        >
                            <div className="add-new-voucher__content--row">
                                <Form.Item
                                    label="Tên mã giảm giá"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tên mã giảm giá',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Tên mã giảm giá" />
                                </Form.Item>
                                <Form.Item
                                    label="Hình thức giảm giá"
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn hình thức giảm giá',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Hình thức giảm giá"
                                        allowClear={false}
                                        options={[
                                            {
                                                value: 'fixed',
                                                label: 'Giảm cố định',
                                            },
                                            {
                                                value: 'percentage',
                                                label: 'Giảm theo phần trăm',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Giá giảm"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giảm giá',
                                        },
                                        {
                                            pattern: DIGIT_VALIDATE,
                                            message:
                                                'Giá giảm không hợp lệ, vui lòng kiếm tra lại',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Giá giảm"
                                        value={reduceCost}
                                        onChange={onChangeReduceCost}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Số lượng mã giảm"
                                    name="max_number"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập số lượng mã giảm',
                                        },
                                        {
                                            pattern: DIGIT_VALIDATE,
                                            message:
                                                'Số lượng mã giảm không hợp lệ, vui lòng kiếm tra lại',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Số lượng mã giảm" />
                                </Form.Item>
                            </div>
                            <div className="add-new-voucher__content--row">
                                <Form.Item
                                    label="Giá trị đơn tối thiểu (VNĐ)"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập giá trị đơn tối thiểu',
                                        },
                                        {
                                            pattern: DIGIT_VALIDATE,
                                            message:
                                                'Giá trị đơn tối thiểu không hợp lệ, vui lòng kiếm tra lại',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Giá trị đơn tối thiểu"
                                        value={minCost}
                                        onChange={onChangeMinCost}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Ngày bắt đầu"
                                    name="start_date"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn ngày bắt đầu',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Ngày bắt đầu"
                                        format={DEFAULT_DISPLAY_DATE_FORMAT}
                                        minDate={dayjs()}
                                        onChange={onChangeStartDate}
                                        allowClear={false}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Ngày hết hạn"
                                    name="expired_date"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn ngày hết hạn',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Ngày hết hạn"
                                        format={DEFAULT_DISPLAY_DATE_FORMAT}
                                        onChange={onChangeExpiredDate}
                                        disabled={!selectedStartDate}
                                        allowClear={false}
                                        disabledDate={disabledExpiredDate}
                                    />
                                </Form.Item>
                            </div>
                            <div className="add-new-voucher__content--row--img">
                                <Form.Item
                                    label="Ảnh bìa"
                                    name="image"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn ảnh bìa của voucher',
                                        },
                                    ]}
                                >
                                    {showUpload === false ? (
                                        <Image width="100%" src={imgURL} />
                                    ) : (
                                        <Upload.Dragger
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={handleUploadCoverImg}
                                            beforeUpload={handleBeforeUpload}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">
                                                Chọn ảnh bìa của mã giảm giá
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
                            <div className="add-new-voucher__content-btn">
                                <Button
                                    type="primary"
                                    shape="round"
                                    icon={<CompassFilled />}
                                    size="large"
                                    htmlType="submit"
                                    // disabled={loading}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
);

Inner.displayName = 'Admin Add New Voucher Inner';

export default Inner;
