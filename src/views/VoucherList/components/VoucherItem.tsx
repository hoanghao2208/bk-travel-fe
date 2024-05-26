import dayjs from 'dayjs';
import { FC, memo } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import '../style.scss';

interface VoucherItemProps {
    imgURL: string;
    name: string;
    startDate: string;
    expriredDate: string;
    type: string;
    code: string;
    discount: number;
    minOrder: number;
    remain: number;
}

const VoucherItem: FC<VoucherItemProps> = memo(
    ({
        imgURL,
        name,
        startDate,
        expriredDate,
        type,
        code,
        discount,
        minOrder,
        remain,
    }) => {
        return (
            <div className="voucher-item">
                <img
                    src={imgURL}
                    alt="voucher-img"
                    className="voucher-item--img"
                />
                <div className="voucher-item--info">
                    <div className="voucher-item--header">
                        <h3 className="voucher-item--title">{name}</h3>
                        <span>
                            {type === 'fixed'
                                ? discount.toLocaleString() + ' VNĐ'
                                : discount * 100 + ' %'}
                        </span>
                    </div>
                    <div className="voucher-item--row">
                        <div className="voucher-item--value">
                            <span>Ngày bắt đầu: </span>
                            <span>
                                {dayjs(startDate).format(
                                    DEFAULT_DISPLAY_DATE_FORMAT
                                )}
                            </span>
                        </div>
                        <div className="voucher-item--value">
                            <span>Ngày kết thúc: </span>
                            <span>
                                {dayjs(expriredDate).format(
                                    DEFAULT_DISPLAY_DATE_FORMAT
                                )}
                            </span>
                        </div>
                        <div className="voucher-item--value">
                            <span>Loại giảm giá: </span>
                            <span>
                                {type === 'fixed'
                                    ? 'Giảm giá cố định'
                                    : 'Giảm giá phần trăm'}
                            </span>
                        </div>
                    </div>
                    <div className="voucher-item--row">
                        <div className="voucher-item--value">
                            <span>Mã giảm giá: </span>
                            <span>{code}</span>
                        </div>
                        <div className="voucher-item--value">
                            <span>Số lượng còn lại: </span>
                            <span>{remain}</span>
                        </div>
                        <div className="voucher-item--value">
                            <span>Giá trị đơn tối thiểu: </span>
                            <span>{minOrder.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

VoucherItem.displayName = 'Voucher Item';

export default VoucherItem;
