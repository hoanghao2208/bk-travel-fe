import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class AdminService extends ApiBase {
    getTotalBooked = (token: string) => {
        const url = 'http://localhost:8080/admin/total-bookednumber';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getTotalRevenue = (token: string) => {
        const url = 'http://localhost:8080/admin/total-revenue';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getTopRatedTours = () => {
        const url = 'http://localhost:8080/api/v1/tours/toprated';
        return axios.get(url);
    };
}

const adminService = new AdminService();

export default adminService;
