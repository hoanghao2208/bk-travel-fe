import { Form } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCustomerId, getToken } from 'reducers/token/function';
import orderService from 'services/orderService';
import voucherService from 'services/voucherService';
import Inner from 'views/FillInformationPage/Inner';

const Wrapper = memo(() => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const userId = getCustomerId();
    const token = getToken();

    const [form] = Form.useForm();

    const [orderInfor, setOrderInfor] = useState([]);
    const [listVoucher, setListVoucher] = useState([]);
    const [isReload, setIsReload] = useState(false);

    const getOrderInformation = useCallback(async () => {
        try {
            const orderId = searchParams.getAll('orderId').map(Number);
            const response = await orderService.getOneOrder(orderId, token);
            if (response?.status === 200) {
                setOrderInfor(response.data.order);
            }
        } catch (error) {
            console.error(error);
        }
    }, [searchParams, token]);

    const handleApplyVoucher = useCallback(
        async value => {
            try {
                const orderId = searchParams.getAll('orderId').map(Number);
                const body = {
                    order_id: orderId,
                    listVoucherCodes: [value.voucher_code],
                };

                const response = await voucherService.applyVoucher(body, token);
                if (response?.status === 200) {
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
        [form, searchParams, token]
    );

    const handleRemoveVoucher = useCallback(
        async value => {
            try {
                const orderId = searchParams.getAll('orderId').map(Number);
                const body = {
                    order_id: orderId,
                    code: value,
                };
                const response = await voucherService.removeVoucherFromOrder(
                    body,
                    token
                );
                if (response?.status === 200) {
                    setIsReload(prev => !prev);
                    Message.sendInfo('Xóa mã giảm giá thành công');
                }
            } catch (error) {
                console.error(error);
            }
        },
        [searchParams, token]
    );

    const handlePaymentDirectly = useCallback(async () => {
        try {
            const orderId = searchParams.getAll('orderId').map(Number);
            const body = {
                user_id: userId,
                order_id: orderId,
            };
            const response = await orderService.paymentDirectly(body, token);
            if (response?.status === 200) {
                if (
                    new URL(response.data.link_payment).origin !==
                    window.location.origin
                ) {
                    window.location.href = response.data.link_payment;
                } else {
                    navigate(response.data.link_payment);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [navigate, searchParams, token, userId]);

    const handleGetAllVoucherInOrder = useCallback(async () => {
        try {
            const orderId = searchParams.getAll('orderId').map(Number);
            const response = await voucherService.getAllVoucherInOrder(
                orderId,
                token
            );
            if (response?.status === 200) {
                setListVoucher(response.data.vouchers.vouchers);
            }
        } catch (error) {
            console.error(error);
        }
    }, [searchParams, token]);

    useEffect(() => {
        handleGetAllVoucherInOrder();
    }, [handleGetAllVoucherInOrder, isReload]);

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
            handleRemoveVoucher={handleRemoveVoucher}
            handlePaymentDirectly={handlePaymentDirectly}
        />
    );
});

Wrapper.displayName = 'Fill Information Page';

const FillInformationPage = Wrapper;

export default FillInformationPage;
