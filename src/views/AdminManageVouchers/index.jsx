import { memo, useCallback, useEffect, useState } from 'react';
import voucherService from 'services/voucherService';
import Inner from 'views/AdminManageVouchers/Inner';

const Wrapper = memo(() => {
    const [voucherData, setVoucherData] = useState([]);
    const [isReload, setIsReload] = useState(false);

    const getAllVouchers = useCallback(async () => {
        try {
            const response = await voucherService.getAllVouchers();
            if (response?.status === 200) {
                setVoucherData(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getAllVouchers();
    }, [getAllVouchers, isReload]);

    return <Inner voucherData={voucherData} setIsReload={setIsReload} />;
});

Wrapper.displayName = 'Admin Manage Vouchers';

const AdminManageVouchers = Wrapper;

export default AdminManageVouchers;
