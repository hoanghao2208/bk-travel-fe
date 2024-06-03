import { Button, Form, Input, Modal } from 'antd';
import Message from 'components/Message';
import { memo, useCallback } from 'react';
import { getToken } from 'reducers/token/function';
import customTourService from 'services/customTourService';
import './styles.scss';

const ActivityModal = memo(
    ({ form, tourId, userId, modalOpen, handleCancel, setReload }) => {
        const token = getToken();

        const handleResponseCustomTour = useCallback(
            async value => {
                try {
                    const body = {
                        user_id: userId,
                        status: 'reject',
                        reason: value.reason,
                    };
                    const response = await customTourService.responseCustomTour(
                        tourId,
                        body,
                        token
                    );
                    if (response?.status === 200) {
                        Message.sendSuccess('Bạn đã phản hồi thành công');
                        form.resetFields();
                        setReload(prev => !prev);
                    }
                } catch (error) {
                    console.error(error);
                    Message.sendError('Đã có lỗi xãy ra, vui lòng thử lại');
                }
            },
            [form, setReload, token, tourId, userId]
        );

        return (
            <Modal
                open={modalOpen}
                title="Từ chối tour đề xuất của khách hàng"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button
                        danger
                        htmlType="submit"
                        key="submit"
                        type="primary"
                        form="reject-custom-tour"
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="reject-custom-tours"
                    id="reject-custom-tour"
                    layout="vertical"
                    onFinish={handleResponseCustomTour}
                >
                    <Form.Item
                        name="reason"
                        label="Lý do"
                        rules={[
                            {
                                required: true,
                                message: `Vui lòng nhập lý do`,
                            },
                        ]}
                    >
                        <Input placeholder="Báo lý do từ chối" />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
);

ActivityModal.displayName = 'Activity Modal';

export default ActivityModal;
