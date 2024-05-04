import { Button, Modal } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useState } from 'react';
import voucherService from 'services/voucherService';
import './style.scss';

const ModalDelete = memo(
    ({ isOpen, setIsOpen, selectedId, data, setIsReload }) => {
        const voucherData = data.filter(item => item.voucher_id === selectedId);
        const [loading, setLoading] = useState(false);

        const handleDeleteVoucher = useCallback(async () => {
            try {
                setLoading(true);
                const response = await voucherService.deleteVoucher(selectedId);
                if (response?.status === 200) {
                    Message.sendSuccess('Xóa mã giảm giá thành công');
                    setIsReload(prev => !prev);
                }
            } catch (error) {
                console.error(error);
                Message.sendError(
                    'Đã có lỗi xãy ra! Xóa mã giảm giá không thành công'
                );
            } finally {
                setLoading(false);
                setIsOpen(false);
            }
        }, [selectedId, setIsOpen, setIsReload]);

        return (
            <Modal
                title="Bạn chắc chắn muốn xóa mã giảm giá này?"
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsOpen(false)}>
                        Hủy
                    </Button>,
                    <Button
                        danger
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleDeleteVoucher}
                    >
                        Xóa
                    </Button>,
                ]}
            >
                <p>
                    Xóa mã{' '}
                    <span className="delete--desc">
                        {voucherData[0]?.description}
                    </span>
                </p>
            </Modal>
        );
    }
);

ModalDelete.displayName = 'Modal Delete';

export default ModalDelete;
