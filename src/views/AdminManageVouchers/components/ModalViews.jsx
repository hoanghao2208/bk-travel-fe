import { Image, Modal } from 'antd';
import dayjs from 'dayjs';
import { memo } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './style.scss';

const ModalViews = memo(({ isOpen, setIsOpen, selectedId, data }) => {
    const voucherData = data.filter(item => item.voucher_id === selectedId);

    return (
        <Modal
            title={voucherData[0]?.description}
            open={isOpen}
            style={{ top: 30 }}
            onCancel={() => setIsOpen(false)}
            footer={null}
        >
            <Image src={voucherData[0]?.image} width="100%" />
            <div className="view--modal">
                <div className="view--item">
                    <span className="view--item--title">
                        Hình thức giảm giá:
                    </span>
                    <span className="view--item--content">
                        {voucherData[0]?.type === 'percentage'
                            ? 'Giảm theo phần trăm'
                            : 'Giảm cố định'}
                    </span>
                </div>
                <div className="view--item">
                    <span className="view--item--title">Mã giảm giá:</span>
                    <span className="view--item--content">
                        {voucherData[0]?.code_voucher}
                    </span>
                </div>
                <div className="view--item">
                    <span className="view--item--title">Giá giảm:</span>
                    <span className="view--item--content">
                        {voucherData[0]?.type === 'percentage'
                            ? voucherData[0]?.value_discount * 100 + '%'
                            : voucherData[0]?.value_discount.toLocaleString() +
                              ' VNĐ'}
                    </span>
                </div>
                <div className="view--item">
                    <span className="view--item--title">Ngày bắt đầu:</span>
                    <span className="view--item--content">
                        {dayjs(voucherData[0]?.start_date).format(
                            DEFAULT_DISPLAY_DATE_FORMAT
                        )}
                    </span>
                </div>
                <div className="view--item">
                    <span className="view--item--title">Ngày kết thúc:</span>
                    <span className="view--item--content">
                        {dayjs(voucherData[0]?.expired_date).format(
                            DEFAULT_DISPLAY_DATE_FORMAT
                        )}
                    </span>
                </div>
            </div>
        </Modal>
    );
});

ModalViews.displayName = 'Modal Views';

export default ModalViews;
