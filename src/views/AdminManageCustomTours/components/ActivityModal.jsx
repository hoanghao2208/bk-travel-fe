import { Button, Form, Input, Modal } from 'antd';
import Message from 'components/Message';
import { memo, useCallback } from 'react';
import { getToken } from 'reducers/token/function';
import customTourService from 'services/customTourService';
import { DIGIT_VALIDATE } from 'utils/constants';
import './styles.scss';

const ActivityModal = memo(
    ({
        form,
        formId,
        tourId,
        userId,
        title,
        name,
        label,
        modalOpen,
        handleCancel,
        setReload,
    }) => {
        const token = getToken();

        const handleResponseCustomTour = useCallback(
            async value => {
                try {
                    const newValue =
                        name === 'price' ? parseInt(value[name]) : value[name];
                    let body = {};
                    if (name === 'price') {
                        body = {
                            user_id: userId,
                            status: 'success',
                            price: newValue,
                            reason: value.description,
                        };
                    } else {
                        body = {
                            user_id: userId,
                            status: 'reject',
                            reason: newValue,
                        };
                    }
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
            [form, name, setReload, token, tourId, userId]
        );

        return (
            <Modal
                open={modalOpen}
                title={title}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button
                        danger={name === 'reason'}
                        htmlType="submit"
                        key="submit"
                        type="primary"
                        form={`${formId}-${tourId}`}
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name={`${formId}-${tourId}`}
                    id={`${formId}-${tourId}`}
                    layout="vertical"
                    onFinish={handleResponseCustomTour}
                >
                    <Form.Item
                        name={name}
                        label={label}
                        rules={[
                            {
                                required: true,
                                message: `Vui lòng điền ${label}`,
                            },
                            ...(name === 'price'
                                ? [
                                      {
                                          pattern: DIGIT_VALIDATE,
                                          message:
                                              'Giá tour không phù hợp, vui lòng kiếm tra lại',
                                      },
                                  ]
                                : []),
                        ]}
                    >
                        <Input placeholder={`Báo ${label}`} />
                    </Form.Item>
                    {name === 'price' && (
                        <Form.Item
                            name="description"
                            label="Mô tả tour"
                            rules={[
                                {
                                    required: true,
                                    message: `Vui lòng mô tả tour du lịch`,
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Mô tả tour du lịch"
                                style={{ height: 180 }}
                            />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        );
    }
);

ActivityModal.displayName = 'Activity Modal';

export default ActivityModal;
