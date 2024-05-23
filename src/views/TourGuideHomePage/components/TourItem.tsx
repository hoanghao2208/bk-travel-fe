import { Button, Form, Input, Modal, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tourService from 'services/tourService';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import { ITour } from 'utils/type';
import '../style.scss';

interface TourItemProps {
    tour_id: number;
    description: string;
}

const TourItem: FC<TourItemProps> = memo(({ tour_id, description }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [openModalCancel, setOpenModalCancel] = useState(false);
    const [tourDetail, setTourDetail] = useState<ITour>();

    const handleGetDetailTour = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourDetail(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleCancelTour = useCallback((values: { reason: string }) => {
        console.log('reason', values.reason);
    }, []);

    useEffect(() => {
        handleGetDetailTour();
    }, [handleGetDetailTour]);

    return (
        <div className="tour-item" style={{ backgroundColor: 'white' }}>
            <div className="tour-item__header">
                <img
                    src={tourDetail?.cover_image}
                    alt="tour location"
                    className="tour-item__header--img"
                    // onClick={handleNavigate}
                />
            </div>
            <div className="tour-item__center">
                <div className="tour-item__center--date">
                    Ngày{' '}
                    {dayjs(tourDetail?.departure_date).format(
                        DEFAULT_DISPLAY_DATE_FORMAT
                    )}{' '}
                    - {tourDetail?.time}
                </div>
                <div className="tour-item__center--location">
                    <Tooltip title="Tour du lịch số 1">
                        <Link to="/">{tourDetail?.name}</Link>
                    </Tooltip>
                </div>
                <div className="tour-item__center--start">
                    <span>Nơi khởi hành:</span>
                    <span className="tour-item__center--data">
                        TP. Hồ Chí Minh
                    </span>
                </div>
                <div className="tour-item__center--start">
                    <span>Số hành khách:</span>
                    <span className="tour-item__center--data">
                        {tourDetail?.booked_number}
                    </span>
                </div>
                <div className="tour-item__center--des">
                    <span>Mô tả: </span>
                    <span>{description}</span>
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
