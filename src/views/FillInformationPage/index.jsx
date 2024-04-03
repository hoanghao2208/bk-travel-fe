import { Form } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCustomerId } from 'reducers/token/function';
import orderService from 'services/orderService';
import voucherService from 'services/voucherService';
import Inner from 'views/FillInformationPage/Inner';

const Wrapper = memo(() => {
    const [searchParams] = useSearchParams();
    const userId = getCustomerId();

    const [form] = Form.useForm();

    const [orderInfor, setOrderInfor] = useState([]);
    const [listVoucher, setListVoucher] = useState([]);
    const [isReload, setIsReload] = useState(false);

    const getOrderInformation = useCallback(async () => {
        try {
            const orderId = searchParams.getAll('orderId').map(Number);
            const response = await orderService.getOneOrder(orderId);
            if (response?.status === 200) {
                setOrderInfor(response.data.order);
            }
        } catch (error) {
            console.error(error);
        }
    }, [searchParams]);

    const handleApplyVoucher = useCallback(
        async value => {
            try {
                const body = {
                    user_id: userId,
                    listVoucherCodes: [value.voucher_code],
                };

                const orderId = searchParams.getAll('orderId').map(Number);
                const response = await voucherService.applyVoucher(
                    orderId,
                    body
                );
                if (response?.status === 200) {
                    setListVoucher(response.data.listVoucher);
                    setIsReload(prev => !prev);
                    Message.sendSuccess('Áp dụng mã giảm giá thành công');
                    form.resetFields();
                }
            } catch (error) {
                if (
                    error?.response.data.message ===
                    'Not found voucher by code!'
                ) {
                    Message.sendError('Mã giảm giá không tồn tại');
                } else if (
                    error?.response.data.message === 'Validation error'
                ) {
                    Message.sendError('Mã giảm giá đã được áp dụng');
                } else {
                    Message.sendError(
                        'Đã có lỗi xãy ra, vui lòng kiểm tra lại'
                    );
                }
            }
        },
        [form, searchParams, userId]
    );

    useEffect(() => {
        getOrderInformation();
    }, [getOrderInformation, isReload]);

    return (
        <Inner
            form={form}
            orderInfor={orderInfor}
            orderItems={orderInfor.order_items}
            listVoucher={listVoucher}
            handleApplyVoucher={handleApplyVoucher}
        />
    );
});

Wrapper.displayName = 'Fill Information Page';

const FillInformationPage = Wrapper;

export default FillInformationPage;
