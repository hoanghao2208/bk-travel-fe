import { TimePicker, Select, Upload, Button, Form, Input } from 'antd';
import { TIME_FORMAT } from 'utils/constants';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import tourService from 'services/tourService';
import './style.scss';

const FormItem = ({ id }) => {
    const { tour_id } = useParams();
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

    return (
        <div className="location-form">
            <div>
                <Form.Item name={`time-${id}`} label="Khoảng thời gian">
                    <TimePicker.RangePicker format={TIME_FORMAT} />
                </Form.Item>
            </div>
            <div>
                <Form.Item name={`locations-${id}`} label="Địa điểm vui chơi">
                    <Select
                        showSearch
                        placeholder="Địa điểm vui chơi"
                        options={tourDestinations}
                    />
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Mô tả" name={`description-${id}`}>
                    <Input placeholder="Mô tả" />
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Lưu ý" name={`note-${id}`}>
                    <Input placeholder="Lưu ý" />
                </Form.Item>
            </div>
            <div>
                <Form.Item name={`image-${id}`} label="Hình ảnh">
                    <Upload maxCount={1}>
                        <Button icon={<UploadOutlined />}>Thêm hình ảnh</Button>
                    </Upload>
                </Form.Item>
            </div>
        </div>
    );
};

export default FormItem;
