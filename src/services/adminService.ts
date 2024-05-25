import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';
import { BASE_URL } from 'utils/constants';

class AdminService extends ApiBase {
    getTotalBooked = (token: string) => {
        const url = BASE_URL + '/admin/total-bookednumber';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getTotalRevenue = (token: string) => {
        const url = BASE_URL + '/admin/total-revenue';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getTopRatedTours = () => {
        const url = BASE_URL + '/api/v1/tours/toprated';
        return axios.get(url);
    };
}

const adminService = new AdminService();

export default adminService;
