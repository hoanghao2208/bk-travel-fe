import { FC, memo } from 'react';
import './styles.scss';

interface PayCostItemProps {
    cost: string;
    reduced: string;
    total: string;
    score: number;
}

const PayCostItem: FC<PayCostItemProps> = memo(
    ({ cost, reduced, total, score }) => {
        return (
            <div className="pay-cost">
                <h3 className="pay-cost__title">Hóa đơn</h3>
                <div className="pay-cost__inf">
                    <div className="pay-cost__inf--price">
                        <span className="pay-cost--title">Giá</span>
                        <span className="pay-cost--value">
                            {cost.toLocaleString()} VNĐ
                        </span>
                    </div>
                    <div>
                        <span className="pay-cost--title">Giảm giá</span>
                        <span className="pay-cost--value">
                            {reduced.toLocaleString()} VNĐ
                        </span>
                    </div>
                </div>
                <div className="pay-cost__inf pay-cost__total">
                    <div>
                        <span className="pay-cost--title">Tổng cộng</span>
                        <span className="pay-cost--value">
                            {total.toLocaleString()} VNĐ
                        </span>
                    </div>
                </div>
                <p className="pay-cost__score">
                    * Bạn sẽ nhận được {score} điểm thành viên sau khi thanh
                    toán
                </p>
            </div>
        );
    }
);

PayCostItem.displayName = 'Pay Cost Item';

export default PayCostItem;
