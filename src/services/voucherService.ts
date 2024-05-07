import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class VoucherService extends ApiBase {
    createVoucher = (requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/voucher';
        return axios.post(url, requestBody);
    };

    getAllVouchers = () => {
        const url = 'http://localhost:8080/api/v1/voucher/all';
        return axios.get(url);
    };

    getOneVoucher = (voucher_id: number) => {
        const url = `http://localhost:8080/api/v1/voucher/${voucher_id}`;
        return axios.get(url);
    };

    deleteVoucher = (voucher_id: number) => {
        const url = `http://localhost:8080/api/v1/voucher/${voucher_id}`;
        return axios.delete(url);
    };

    applyVoucher = (
        orderId: number,
        requestBody: {
            user_id: number;
            listVoucherCodes: string[];
        }
    ) => {
        const url = `http://localhost:8080/api/v1/order/${orderId}/applyVoucher`;
        return axios.post(url, requestBody);
    };

    removeVoucherFromOrder = (
        order_id: number,
        requestBody: {
            code: string;
        }
    ) => {
        const url = `http://localhost:8080/api/v1/order/${order_id}/vouchers`;
        return axios.post(url, requestBody);
    };

    getAllVoucherInOrder = (order_id: number) => {
        const url = `http://localhost:8080/api/v1/order/${order_id}/vouchers`;
        return axios.get(url);
    };
}

const voucherService = new VoucherService();

export default voucherService;
