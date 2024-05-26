import Title from 'components/Title';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo } from 'react';
import VoucherItem from 'views/VoucherList/components/VoucherItem';
import './style.scss';

const Inner = memo(({ allVouchers }) => {
    return (
        <UserHomePageLayout>
            <div className="voucher-list">
                <Title title="Danh sách các mã giảm giá" />
                <div className="voucher-list--wrapper">
                    {allVouchers.map(voucher => (
                        <VoucherItem
                            key={voucher.voucher_id}
                            imgURL={voucher.image}
                            name={voucher.description}
                            startDate={voucher.start_date}
                            expriredDate={voucher.expired_date}
                            type={voucher.type}
                            code={voucher.code_voucher}
                            discount={voucher.value_discount}
                            minOrder={voucher.min_order_value}
                            remain={voucher.remain_number}
                        />
                    ))}
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Voucher List Inner';

export default Inner;
