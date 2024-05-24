import { Form, Input, Select, TimePicker } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourService from 'services/tourService';
import { TIME_FORMAT } from 'utils/constants';
import './style.scss';

const Item = memo(
    ({ name, tourDestinations, statusOptions, hidden, ...props }) => {
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
                            <TimePicker.RangePicker
                                format={TIME_FORMAT}
                                disabled
                            />
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
                                disabled
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            {...props}
                            name={[name, 'status']}
                            label="Trạng thái"
                        >
                            <Select
                                showSearch
                                placeholder="Trạng thái"
                                options={statusOptions}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            {...props}
                            name={[name, 'note']}
                            label="Lưu ý"
                        >
                            <Input placeholder="Lưu ý" />
                        </Form.Item>
                    </div>
                </div>
            </div>
        );
    }
);

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

    const statusOptions = useMemo(() => {
        return [
            {
                label: 'Đã hoàn thành',
                value: 'checkin',
            },
            {
                label: 'Trì hoãn',
                value: 'delay',
            },
            {
                label: 'Hủy kế hoạch',
                value: 'skip',
            },
        ];
    }, []);

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
                {fields => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Item
                                key={key}
                                name={name}
                                tourDestinations={tourDestinations}
                                statusOptions={statusOptions}
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
