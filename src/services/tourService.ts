import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class TourService extends ApiBase {
    createTour = (token: string, requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/tours';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllTour = () => {
        const url = 'http://localhost:8080/api/v1/tours/all';
        return axios.get(url);
    };

    getOneTour = (tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tours/${tour_id}`;
        return axios.get(url);
    };

    getWaitingTour = (token: string) => {
        const url = 'http://localhost:8080/api/v1/tours/all/waiting';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getOnlineTour = () => {
        const url = 'http://localhost:8080/api/v1/tours/all/online';
        return axios.get(url);
    };

    getDeletedTour = (token: string) => {
        const url = 'http://localhost:8080/api/v1/tours/all/deleted';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    deleteTour = (tour_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/tours/${tour_id}`;
        return axios.delete(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    recoverTour = (tour_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/tours/recover/${tour_id}`;
        return axios.put(
            url,
            {},
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
    };

    updateTour = (requestBody: any, tour_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/tours/${tour_id}`;
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllDestinations = () => {
        const url = 'http://localhost:8080/api/v1/destinations/all';
        return axios.get(url);
    };

    getAllAttractions = (destination: string) => {
        const url = 'http://localhost:8080/api/v1/attractions/all';
        return axios.get(url, {
            params: {
                destination,
            },
        });
    };

    createSchedule = (
        requestBody: {
            tour_id: number;
            schedule_detail: any;
        },
        token: string
    ) => {
        const url = 'http://localhost:8080/api/v1/schedules';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllAttractionsOfTour = (id_tour: number) => {
        const url = `http://localhost:8080/api/v1/tours/${id_tour}/destinations`;
        return axios.get(url);
    };

    getTourSchedule = (id_tour: number) => {
        const url = `http://localhost:8080/api/v1/tours/${id_tour}/schedules`;
        return axios.get(url);
    };

    findTour = (params: {
        departure_place?: string;
        destination_place?: string;
        time?: string;
        departure_date?: string;
    }) => {
        const url = 'http://localhost:8080/api/v1/tours/search';

        return axios.get(url, { params });
    };
}

const tourService = new TourService();

export default tourService;
