import { memo, useCallback, useEffect, useState } from 'react';
import voucherService from 'services/voucherService';
import Inner from 'views/VoucherList/Inner';

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Ưu đãi';
    });

    const [allVouchers, setAllVouchers] = useState([]);

    const handleGetAllVouchers = useCallback(async () => {
        try {
            const response = await voucherService.getAllVouchers();
            if (response?.status === 200) {
                setAllVouchers(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        handleGetAllVouchers();
    }, [handleGetAllVouchers]);

    return <Inner allVouchers={allVouchers} />;
});

Wrapper.displayName = 'Voucher List';

const VoucherList = Wrapper;

export default VoucherList;
