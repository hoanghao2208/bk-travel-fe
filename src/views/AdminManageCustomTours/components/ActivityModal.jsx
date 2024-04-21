import { Button, Form, Input, Modal } from 'antd';
import { memo } from 'react';
import './styles.scss';

const ActivityModal = memo(
    ({
        form,
        formId,
        title,
        name,
        label,
        modalOpen,
        handleCancel,
        handleOk,
    }) => {
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
                        form={formId}
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name={formId}
                    id={formId}
                    layout="vertical"
                    onFinish={handleOk}
                >
                    <Form.Item
                        name={name}
                        label={label}
                        rules={[
                            {
                                required: true,
                                message: `Vui lòng điền ${label}`,
                            },
                        ]}
                    >
                        <Input placeholder={`Báo ${label} cho khách hàng`} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
);

ActivityModal.displayName = 'Activity Modal';

export default ActivityModal;
