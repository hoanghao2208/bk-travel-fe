import { FC, memo } from 'react';
import './styles.scss';

interface PayCostItemProps {
    location: string;
    date: string;
    pack: string;
    departure: string;
    time: string;
    adult: number;
    children: number;
    cost: string;
    reduced: string;
    total: string;
    score: number;
}

const PayCostItem: FC<PayCostItemProps> = memo(
    ({
        location,
        date,
        pack,
        departure,
        time,
        adult,
        children,
        cost,
        reduced,
        total,
        score,
    }) => {
        return (
            <div className="pay-cost">
                <h3 className="pay-cost__location">{location}</h3>
                <div className="pay-cost__inf1">
                    <div>
                        <span>Ngày</span>
                        <span>{date}</span>
                    </div>
                    <div>
                        <span>Gói dịch vụ</span>
                        <span>{pack}</span>
                    </div>
                    <div>
                        <span>Khởi hành</span>
                        <span>{departure}</span>
                    </div>
                    <div>
                        <span>Thời gian</span>
                        <span>{time}</span>
                    </div>
                </div>
                <div className="pay-cost__inf2">
                    <p>Số lượng hành khách</p>
                    <div className="pay-cost__inf2--adult">
                        <span>Người lớn</span>
                        <span>{adult}</span>
                    </div>
                    <div>
                        <span>Trẻ em</span>
                        <span>{children}</span>
                    </div>
                </div>
                <div className="pay-cost__inf3">
                    <div className="pay-cost__inf3--price">
                        <span>Giá</span>
                        <span>đ {cost}</span>
                    </div>
                    <div>
                        <span>Giảm giá</span>
                        <span>- đ {reduced}</span>
                    </div>
                </div>
                <div className="pay-cost__inf3">
                    <div>
                        <span>Tổng cộng</span>
                        <span>đ {total}</span>
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
