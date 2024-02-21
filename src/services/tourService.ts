import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class TourService extends ApiBase {
    createTour = (requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/tour';
        return axios.post(url, requestBody);
    };
}

const tourService = new TourService();

export default tourService;
