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
}

const tourGuideService = new TourGuideService();

export default tourGuideService;
