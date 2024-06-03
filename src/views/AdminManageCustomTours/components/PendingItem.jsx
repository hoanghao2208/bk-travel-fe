import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityModal from 'views/AdminManageCustomTours/components/ActivityModal';
import './styles.scss';

const PendingItem = memo(
    ({
        status,
        name,
        time,
        tourId,
        userId,
        note,
        price,
        current_customers,
        departure_place,
        departure_date,
        departure_time,
        destination_place,
        attractions,
        setReload,
    }) => {
        const [form] = Form.useForm();
        const navigate = useNavigate();

        const [modalReject, setModalReject] = useState(false);

        const handleCancelReject = () => {
            setModalReject(false);
            form.resetFields();
        };

        const attractionNames = attractions.map(attraction => attraction.name);
        const namesString = attractionNames.join(', ');

        return (
            <div className="pending-item">
                <div className="pending-item--infor">
                    <h3 className="pending-item--title">{name}</h3>
                    <div className="pending-item--infor--wrapper">
                        <div>
                            <div className="pending-item--location">
                                <span>Khởi hành từ:</span>
                                <span>{departure_place}</span>
                            </div>
                            <div className="pending-item--location">
                                <span>Khởi hành:</span>
                                <span>
                                    {departure_time} - {departure_date} - {time}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="pending-item--location">
                                <span>Các điểm đến:</span>
                                <span>{destination_place}</span>
                            </div>
                            <div className="pending-item--location">
                                <span>Số khách:</span>
                                <span>{current_customers}</span>
                            </div>
                        </div>
                        {status === 'SUCCESS' && (
                            <div>
                                <div className="pending-item--location">
                                    <span>Giá tour:</span>
                                    <span>{price.toLocaleString()} VNĐ</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pending-item--location">
                        <span>Điểm vui chơi:</span>
                        <span>{namesString}</span>
                    </div>

                    <div className="pending-item--location">
                        {status === 'REJECT' && <span>Lý do: </span>}
                        {status === 'SUCCESS' && <span>Mô tả: </span>}
                        {status === 'PENDING' && <span>Ghi chú: </span>}
                        <span>{note}</span>
                    </div>
                </div>
                {status === 'PENDING' && (
                    <div className="pending-item--btn">
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={() =>
                                navigate(
                                    `/admin/schedule/${tourId}?userId=${userId}`
                                )
                            }
                        >
                            Xác nhận
                        </Button>
                        <Button
                            danger
                            type="primary"
                            icon={<CloseOutlined />}
                            onClick={() => setModalReject(true)}
                        >
                            Từ chối
                        </Button>
                    </div>
                )}
                <ActivityModal
                    form={form}
                    tourId={tourId}
                    userId={userId}
                    modalOpen={modalReject}
                    handleCancel={handleCancelReject}
                    setReload={setReload}
                />
            </div>
        );
    }
);

PendingItem.displayName = 'Pending Item';

export default PendingItem;
