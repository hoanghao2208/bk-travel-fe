import { Button, Form, Input, Modal, Tooltip } from 'antd';
import { FC, memo, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style.scss';

const TourItem: FC = memo(() => {
    const navigate = useNavigate();

    const [openModalCancel, setOpenModalCancel] = useState(false);
    const [form] = Form.useForm();

    const handleCancelTour = useCallback((values: { reason: string }) => {
        console.log('reason', values.reason);
    }, []);

    return (
        <div className="tour-item" style={{ backgroundColor: 'white' }}>
            <div className="tour-item__header">
                <img
                    src="/images/slide1.jpg"
                    alt="tour location"
                    className="tour-item__header--img"
                    // onClick={handleNavigate}
                />
            </div>
            <div className="tour-item__center">
                <div className="tour-item__center--date">
                    Ngày 13/05/2024 - 19:00
                </div>
                <div className="tour-item__center--location">
                    <Tooltip title="Tour du lịch số 1">
                        <Link to="/">Tour du lịch số 1</Link>
                    </Tooltip>
                </div>
                <div className="tour-item__center--start">
                    <span>Nơi khởi hành:</span>
                    <span className="tour-item__center--data">
                        TP. Hồ Chí Minh
                    </span>
                </div>
            </div>

            <div className="tour-item__bottom">
                <Button
                    type="default"
                    shape="round"
                    danger
                    size="large"
                    onClick={() => setOpenModalCancel(true)}
                >
                    Yêu cầu hủy
                </Button>
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={() => navigate('/tour-guide/missions/1')}
                >
                    Trang nhiệm vụ
                </Button>
            </div>

            <Modal
                title="Yêu cầu hủy tour được giao"
                open={openModalCancel}
                onCancel={() => setOpenModalCancel(false)}
                footer={[
                    <Button
                        key="back"
                        onClick={() => setOpenModalCancel(false)}
                    >
                        Hủy
                    </Button>,
                    <Button
                        danger
                        htmlType="submit"
                        key="submit"
                        type="primary"
                        form="cancel-my-tour"
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="cancel-my-tour"
                    id="cancel-my-tour"
                    layout="vertical"
                    onFinish={handleCancelTour}
                >
                    <Form.Item
                        name="reason"
                        label="Lý do hủy"
                        rules={[
                            {
                                required: true,
                                message: `Vui lòng điền lý do`,
                            },
                        ]}
                    >
                        <Input placeholder="Lý do bạn muốn hủy chuyến" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
});

TourItem.displayName = 'TourGuide Tour Item';

export default TourItem;
