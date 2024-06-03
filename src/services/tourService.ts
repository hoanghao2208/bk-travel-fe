import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';
import { BASE_URL } from 'utils/constants';

class TourService extends ApiBase {
    createTour = (token: string, requestBody: any) => {
        const url = BASE_URL + '/api/v1/tours';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllTour = () => {
        const url = BASE_URL + '/api/v1/tours/all';
        return axios.get(url);
    };

    getOneTour = (tour_id: number) => {
        const url = BASE_URL + `/api/v1/tours/${tour_id}`;
        return axios.get(url);
    };

    getWaitingTour = (token: string) => {
        const url = BASE_URL + '/api/v1/tours/all/waiting';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getOnlineTour = () => {
        const url = BASE_URL + '/api/v1/tours/all/online';
        return axios.get(url);
    };

    getDeletedTour = (token: string) => {
        const url = BASE_URL + '/api/v1/tours/all/deleted';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    deleteTour = (tour_id: number, token: string) => {
        const url = BASE_URL + `/api/v1/tours/${tour_id}`;
        return axios.delete(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    recoverTour = (tour_id: number, token: string) => {
        const url = BASE_URL + `/api/v1/tours/recover/${tour_id}`;
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
        const url = BASE_URL + `/api/v1/tours/${tour_id}`;
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllDestinations = () => {
        const url = BASE_URL + '/api/v1/destinations/all';
        return axios.get(url);
    };

    getAllAttractions = (destination: string) => {
        const url = BASE_URL + '/api/v1/attractions/all';
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
        const url = BASE_URL + '/api/v1/schedules';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    updateSchedule = (
        schedule_id: number,
        requestBody: {
            tour_id: number;
            schedule_detail: any;
        },
        token: string
    ) => {
        const url = BASE_URL + `/api/v1/schedules/${schedule_id}`;
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    publicTour = (tour_id: number, token: string) => {
        const url = BASE_URL + `/api/v1/tours/${tour_id}/public`;
        return axios.patch(
            url,
            {},
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
    };

    getAllAttractionsOfTour = (id_tour: number) => {
        const url = BASE_URL + `/api/v1/tours/${id_tour}/destinations`;
        return axios.get(url);
    };

    getTourSchedule = (id_tour: number) => {
        const url = BASE_URL + `/api/v1/tours/${id_tour}/schedules`;
        return axios.get(url);
    };

    findTour = (params: {
        departure_place?: string;
        destination_place?: string;
        time?: string;
        departure_date?: string;
    }) => {
        const url = BASE_URL + '/api/v1/tours/search';

        return axios.get(url, { params });
    };

    adminDuplicateTour = (tour_id: number) => {
        const url = BASE_URL + `/api/v1/tours/${tour_id}`;
        return axios.post(url);
    };

    getHotelByDestination = (destination: string) => {
        const url = BASE_URL + '/api/v1/destinations/hotels';
        return axios.get(url, {
            params: {
                destination,
            },
        });
    };

    createUserSchedule = (
        requestBody: {
            tour_id: number;
            schedule_detail: any;
        },
        token: string
    ) => {
        const url = BASE_URL + '/api/v1/schedules/users';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const tourService = new TourService();

export default tourService;
