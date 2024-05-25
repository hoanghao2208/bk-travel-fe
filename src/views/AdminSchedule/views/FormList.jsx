import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, TimePicker } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourService from 'services/tourService';
import { TIME_FORMAT } from 'utils/constants';
import './style.scss';

const Item = memo(({ name, tourDestinations, hidden, remove, ...props }) => {
    return (
        <div className="location-form">
            <div className="location-form-list">
                <div>
                    <Form.Item
                        {...props}
                        name={[name, 'range_time']}
                        label="Khoảng thời gian"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn khoảng thời gian',
                            },
                        ]}
                    >
                        <TimePicker.RangePicker format={TIME_FORMAT} />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        {...props}
                        name={[name, 'name']}
                        label="Địa điểm vui chơi"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn địa điểm vui chơi',
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
                        {...props}
                        name={[name, 'description']}
                        label="Mô tả"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả',
                            },
                        ]}
                    >
                        <Input placeholder="Mô tả" />
                    </Form.Item>
                </div>
            </div>
            <Form.Item hidden={hidden}>
                <MinusCircleOutlined onClick={remove} />
            </Form.Item>
        </div>
    );
});

const FormList = memo(({ id }) => {
    const { tour_id } = useParams();

    const [tourDestinations, setTourDestinations] = useState([]);

    const anotherAction = useMemo(
        () => [
            {
                label: 'Hoạt động khác',
                options: [
                    {
                        label: 'Bữa sáng',
                        value: 'Bữa sáng',
                    },
                    {
                        label: 'Bữa trưa',
                        value: 'Bữa trưa',
                    },
                    {
                        label: 'Bữa tối',
                        value: 'Bữa tối',
                    },
                    {
                        label: 'Nghỉ ngơi',
                        value: 'Nghỉ ngơi',
                    },
                    {
                        label: 'Tập trung',
                        value: 'Tập trung',
                    },
                    {
                        label: 'Quay về',
                        value: 'Quay về',
                    },
                ],
            },
        ],
        []
    );

    const handleGetTourDestinations = useCallback(async () => {
        const options = [];
        try {
            const response = await tourService.getAllAttractionsOfTour(tour_id);
            if (response.status === 200) {
                response.data.data.forEach(item => {
                    const attractions = item.attractions.map(att => ({
                        label: att.name,
                        value: att.name,
                    }));
                    options.push({
                        label: item.destination.name,
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
            const tourDestinations = await handleGetTourDestinations();
            const mergedOptions = [...tourDestinations, ...anotherAction];
            setTourDestinations(mergedOptions);
        };

        if (tour_id) {
            getAttractions();
        }
    }, [anotherAction, handleGetTourDestinations, tour_id]);

    return (
        <>
            <Form.List name={`schedule-${id}`}>
                {(fields, { add, remove }) => (
                    <>
                        <div className="location-form-btn">
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
                            <Item
                                key={key}
                                name={name}
                                tourDestinations={tourDestinations}
                                remove={() => remove(name)}
                                hidden={fields.length <= 1}
                                {...restField}
                            />
                        ))}
                    </>
                )}
            </Form.List>
        </>
    );
});

FormList.displayName = 'FormList';
Item.displayName = 'Form Item';

export default FormList;
