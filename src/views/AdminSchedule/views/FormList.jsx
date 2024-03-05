import { memo, useCallback, useEffect, useState } from 'react';
import { Form, TimePicker, Input, Button, Select, Upload } from 'antd';
import {
    MinusCircleOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { TIME_FORMAT } from 'utils/constants';
import { useParams } from 'react-router-dom';
import tourService from 'services/tourService';
import './style.scss';

const FormList = memo(({ id }) => {
    const { tour_id } = useParams();
    const [disabled, setDisabled] = useState(false);

    const [tourDestinations, setTourDestinations] = useState([]);

    const handleGetTourDestinations = useCallback(async () => {
        const options = [];
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response.status === 200) {
                response.data.data.destinations.forEach(destination => {
                    const attractions = destination.attractions.map(
                        attraction => ({
                            label: attraction.name,
                            value: attraction.name,
                        })
                    );
                    options.push({
                        label: destination.name,
                        options: attractions,
                    });
                });
            }
        } catch (error) {
            console.error(error);
        }
        return options;
    }, [tour_id]);

    useEffect(() => {
        const getAttractions = async () => {
            const options = await handleGetTourDestinations();
            setTourDestinations(options);
        };

        getAttractions();
    }, [handleGetTourDestinations]);

    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    return (
        <>
            <Form
                name={`admin-schedule-list-${id}`}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.List name={`schedule-${id}`}>
                    {(fields, { add, remove }) => (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: '-60px',
                                }}
                            >
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm
                                    </Button>
                                </Form.Item>
                            </div>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="location-form">
                                    <div className="location-form-list">
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'time']}
                                                label="Khoảng thời gian"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng chọn khoảng thời gian',
                                                    },
                                                ]}
                                            >
                                                <TimePicker.RangePicker
                                                    format={TIME_FORMAT}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'location']}
                                                label="Địa điểm vui chơi"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng chọn địa điểm vui chơi',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Địa điểm vui chơi"
                                                    options={tourDestinations}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                label="Mô tả"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập mô tả',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Mô tả" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'note']}
                                                label="Lưu ý"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập lưu ý',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Lưu ý" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'image']}
                                                label="Hình ảnh"
                                            >
                                                <Upload maxCount={1}>
                                                    <Button
                                                        icon={
                                                            <UploadOutlined />
                                                        }
                                                    >
                                                        Thêm hình ảnh
                                                    </Button>
                                                </Upload>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <Form.Item hidden={fields.length <= 1}>
                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                        />
                                    </Form.Item>
                                </div>
                            ))}
                            {setDisabled(fields.length === 0)}
                        </>
                    )}
                </Form.List>
                {!disabled && (
                    <Form.Item>
                        <div
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={disabled}
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </Form.Item>
                )}
            </Form>
        </>
    );
});

FormList.displayName = 'FormList';

export default FormList;
