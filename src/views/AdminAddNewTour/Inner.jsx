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
import Message from 'components/Message';
import dayjs from 'dayjs';
import AdminLayout from 'layouts/AdminLayout';
import moment from 'moment';
import { memo, useCallback, useEffect, useState } from 'react';
import tourService from 'services/tourService';
import {
    DEFAULT_DISPLAY_DATE_FORMAT,
    DIGIT_VALIDATE,
    TIME_FORMAT,
} from 'utils/constants';
import { useCreateContext } from 'views/AdminAddNewTour/Context';
import './styles.scss';

const Inner = memo(({ handleCreateNewTour, form }) => {
    useEffect(() => {
        document.title = 'Thêm tour du lịch mới';
    });

    const {
        loading,
        fileList,
        setFileList,
        tourImageList,
        setTourImageList,
        tourListURL,
        setTourListURL,
        imgURL,
        setImgURL,
        showUpload,
        setShowUpload,
    } = useCreateContext();

    const [departureDate, setDepartureDate] = useState('');
    const [departureDateSelected, setDepartureDateSelected] = useState(false);
    const [departureTime, setDepartureTime] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');

    const [currentError, setCurrentError] = useState('');
    const [destinationPlaces, setDestinationPlaces] = useState([]);
    const [allAttractions, setAllAttractions] = useState([]);

    const [allDestinations, setAllDestinations] = useState([]);
    const [listAttractions, setListAttractions] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);

    const handleGenerateTimeOptions = useCallback(() => {
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

    const onChangeDepartureDate = (_, dateString) => {
        const formattedDate = moment(
            dateString,
            DEFAULT_DISPLAY_DATE_FORMAT
        ).format('YYYY-MM-DD');
        setDepartureDate(formattedDate);
        setDepartureDateSelected(true);
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
            const isFileValid = handleBeforeUpload(fileList[0].originFileObj);

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

    const handleUploadTourImageList = ({ fileList: newFileList }) => {
        const uniqueFiles = new Set([
            ...tourImageList,
            ...newFileList.map(file => file.originFileObj),
        ]);

        const filesToSet = Array.from(uniqueFiles).filter(handleBeforeUpload);

        setTourImageList(filesToSet);
    };

    const createTourListURL = useCallback(() => {
        if (tourImageList.length > 0) {
            return tourImageList.map(url => {
                const newUrl = URL.createObjectURL(url);
                return newUrl;
            });
        } else {
            return [];
        }
    }, [tourImageList]);

    const handleDeleteImg = () => {
        setImgURL('');
        setShowUpload(true);
        setFileList([]);
    };

    const getAllDestinations = useCallback(async () => {
        try {
            const response = await tourService.getAllDestinations();
            if (response.status === 200) {
                const allDes = response.data.data;
                allDes.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                setAllDestinations(allDes);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleSubmitNewTour = values => {
        const destination_places = values.destination_places.join(', ');

        const tourData = {
            ...values,
            departure_date: departureDate,
            departure_time: departureTime,
            deadline_book_time: deadlineDate,
            cover_image: fileList[0].originFileObj,
            all_attractions: allAttractions,
            destination_places,
            list_images: tourImageList,
        };

        handleCreateNewTour(tourData);
    };

    const handleChangeDestination = values => {
        form.resetFields(['attractions']);
        setDestinationPlaces(values);
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

    const filterOption = (input, option) =>
        (option?.children ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        if (currentError !== '') {
            Message.sendError(currentError, 5);
        }
    }, [currentError]);

    useEffect(() => {
        getAllDestinations();
    }, [getAllDestinations]);

    useEffect(() => {
        const getAttractions = async () => {
            const options = await getAttractionsFromDestinationPlaces();
            setListAttractions(options);
        };

        getAttractions();
    }, [getAttractionsFromDestinationPlaces]);

    useEffect(() => {
        setTimeOptions(handleGenerateTimeOptions());
    }, [handleGenerateTimeOptions]);

    useEffect(() => {
        setTourListURL(createTourListURL());
    }, [createTourListURL, setTourListURL]);

    return (
        <Spin tip="Vui lòng chờ" size="large" spinning={loading}>
            <AdminLayout>
                <div className="add-new-tour">
                    <div className="add-new-tour__header">
                        <h1 className="add-new-tour__header--title">
                            tour du lịch mới
                        </h1>
                        <p className="add-new-tour__header--intro">
                            Vui lòng điền các thông tin bên dưới để có thể hoàn
                            tất việc thêm tour du lịch mới trên hệ thống của bạn
                        </p>
                    </div>
                    <div className="add-new-tour__content">
                        <Form
                            form={form}
                            name="add-new-tour"
                            layout="vertical"
                            onFinish={handleSubmitNewTour}
                            autoComplete="off"
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
                                            format={DEFAULT_DISPLAY_DATE_FORMAT}
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
                                            format={DEFAULT_DISPLAY_DATE_FORMAT}
                                            onChange={onChangeDeadlineDate}
                                            allowClear={false}
                                            minDate={dayjs()}
                                            disabled={!departureDateSelected}
                                            disabledDate={current =>
                                                current &&
                                                current >=
                                                    moment(
                                                        departureDate
                                                    ).subtract(1, 'day')
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
                                        <Select
                                            placeholder="Điểm khởi hành"
                                            showSearch
                                            filterOption={filterOption}
                                        >
                                            {allDestinations.map(
                                                destination => (
                                                    <Option
                                                        key={
                                                            destination.destination_id
                                                        }
                                                        value={destination.name}
                                                    >
                                                        {destination.name}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="add-new-tour__content-inf1--item">
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
                                            placeholder="Điểm đến"
                                            mode="multiple"
                                            allowClear
                                            onChange={handleChangeDestination}
                                            maxTagCount="responsive"
                                            maxTagPlaceholder={omittedValues => (
                                                <Tooltip
                                                    title={omittedValues
                                                        .map(
                                                            ({ label }) => label
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
                                                        value={destination.name}
                                                    >
                                                        {destination.name}
                                                    </Option>
                                                )
                                            )}
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
                                            <Image width="100%" src={imgURL} />
                                        ) : (
                                            <Upload.Dragger
                                                listType="picture-card"
                                                fileList={fileList}
                                                onChange={handleUploadCoverImg}
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
                                                        .map(
                                                            ({ label }) => label
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
                                </div>
                                <div className="add-new-tour__content-inf2--item">
                                    <Form.Item
                                        label="Giá tour (VNĐ)"
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
                                        <Input placeholder="Giá tour (VNĐ)" />
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
                                            style={{ height: 150 }}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="add-new-tour__content-inf3--item">
                                    <Form.Item
                                        name="note"
                                        label="Lưu ý về tour du lịch"
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
                                >
                                    <Input.TextArea
                                        placeholder="Chi tiết về tour du lịch"
                                        style={{ height: 240 }}
                                    />
                                </Form.Item>
                            </div>

                            <div className="add-new-tour__content-inf4">
                                <Form.Item
                                    name="list_images"
                                    label="Hình ảnh các địa điểm du lịch"
                                >
                                    <p className="img-validate">
                                        Định dạng JPG, PNG, JPEG
                                    </p>
                                    <div className="add-new-tour__list-image">
                                        <Image.PreviewGroup>
                                            {tourListURL.length > 0 &&
                                                tourListURL.map(url => (
                                                    <Image
                                                        key={url}
                                                        width={200}
                                                        src={url}
                                                    />
                                                ))}
                                        </Image.PreviewGroup>
                                        <Upload
                                            listType="picture-card"
                                            fileList={[]}
                                            onChange={handleUploadTourImageList}
                                            maxCount={allAttractions?.length}
                                            multiple
                                        >
                                            {'+ Thêm'}
                                        </Upload>
                                    </div>
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
                </div>
            </AdminLayout>
        </Spin>
    );
});

Inner.displayName = 'Admin Add New Tour Inner';

export default Inner;
