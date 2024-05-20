import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class VoucherService extends ApiBase {
    createVoucher = (requestBody: any, token: string) => {
        const url = 'http://localhost:8080/api/v1/vouchers';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllVouchers = () => {
        const url = 'http://localhost:8080/api/v1/vouchers/all';
        return axios.get(url);
    };

    getOneVoucher = (voucher_id: number) => {
        const url = `http://localhost:8080/api/v1/vouchers/${voucher_id}`;
        return axios.get(url);
    };

    deleteVoucher = (voucher_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/vouchers/${voucher_id}`;
        return axios.delete(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    applyVoucher = (
        requestBody: {
            orderId: number;
            listVoucherCodes: string[];
        },
        token: string
    ) => {
        const url = 'http://localhost:8080/api/v1/orders/vouchers';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    removeVoucherFromOrder = (
        requestBody: {
            order_id: number;
            code: string;
        },
        token: string
    ) => {
        const url = 'http://localhost:8080/api/v1/orders/vouchers';
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllVoucherInOrder = (order_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/orders/${order_id}/vouchers`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const voucherService = new VoucherService();

export default voucherService;
