import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class VoucherService extends ApiBase {
    createVoucher = (requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/voucher';
        return axios.post(url, requestBody);
    };
}

const voucherService = new VoucherService();

export default voucherService;
