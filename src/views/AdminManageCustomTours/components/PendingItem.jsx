import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { memo, useState } from 'react';
import ActivityModal from 'views/AdminManageCustomTours/components/ActivityModal';
import './styles.scss';

const PendingItem = memo(
    ({
        status,
        name,
        time,
        departure_place,
        departure_date,
        departure_time,
        destination_place,
    }) => {
        const [form] = Form.useForm();
        const [modalConfirm, setModalConfirm] = useState(false);
        const [modalReject, setModalReject] = useState(false);

        const handleCancelConfirm = () => {
            setModalConfirm(false);
        };

        const handleCancelReject = () => {
            setModalReject(false);
        };

        const handleConfirm = values => {
            console.log('vales', values);
        };

        const handleReject = values => {
            console.log('vales', values);
        };

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
                                <span>Các điểm đến:</span>
                                <span>{destination_place}</span>
                            </div>
                        </div>
                        <div>
                            <div className="pending-item--location">
                                <span>Điểm vui chơi:</span>
                                <span>TP. Hồ Chí Minh, Đà Nẵng, Hà Nội</span>
                            </div>
                            <div className="pending-item--location">
                                <span>Khởi hành:</span>
                                <span>
                                    {departure_time} - {departure_date} - {time}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="pending-item--location">
                        <span>Lưu ý:</span>
                        <span>Tour có nhiều trẻ em</span>
                    </div>
                </div>
                {status === 'PENDING' && (
                    <div className="pending-item--btn">
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={() => setModalConfirm(true)}
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
                    formId="confirm-custom-tour"
                    title="Xác nhận tour đề xuất của khách hàng"
                    name="price"
                    label="Giá tour"
                    modalOpen={modalConfirm}
                    handleCancel={handleCancelConfirm}
                    handleOk={handleConfirm}
                />
                <ActivityModal
                    form={form}
                    formId="reject-custom-tour"
                    title="Từ chối tour đề xuất của khách hàng"
                    name="reason"
                    label="Lý do"
                    modalOpen={modalReject}
                    handleCancel={handleCancelReject}
                    handleOk={handleReject}
                />
            </div>
        );
    }
);

PendingItem.displayName = 'Pending Item';

export default PendingItem;
