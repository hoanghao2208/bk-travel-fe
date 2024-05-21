import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class TourGuideService extends ApiBase {
    getAllTourGuides = (token: string) => {
        const url = 'http://localhost:8080/api/v1/tour_guides';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    createTourguide = (
        requestBody: {
            email: string;
            password: string;
            gender: string;
            phone_number: string;
            lastname: string;
            firstname: string;
        },
        token: string
    ) => {
        const url = 'http://localhost:8080/admin/manage-account';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const tourGuideService = new TourGuideService();

export default tourGuideService;
