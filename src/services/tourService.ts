import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class TourService extends ApiBase {
    createTour = (requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/tour';
        return axios.post(url, requestBody);
    };

    getAllTour = () => {
        const url = 'http://localhost:8080/api/v1/tour/all';
        return axios.get(url);
    };

    getOneTour = (tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tour/${tour_id}`;
        return axios.get(url);
    };

    getWaitingTour = () => {
        const url = 'http://localhost:8080/api/v1/tour/all/waiting';
        return axios.get(url);
    };

    getOnlineTour = () => {
        const url = 'http://localhost:8080/api/v1/tour/all/online';
        return axios.get(url);
    };

    getDeletedTour = () => {
        const url = 'http://localhost:8080/api/v1/tour/all/deleted';
        return axios.get(url);
    };

    deleteTour = (tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tour/${tour_id}`;
        return axios.delete(url);
    };

    recoverTour = (tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tour/recover/${tour_id}`;
        return axios.put(url);
    };

    updateTour = (requestBody: any, tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tour/${tour_id}`;
        return axios.put(url, requestBody);
    };
}

const tourService = new TourService();

export default tourService;
