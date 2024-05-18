import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class CustomTourService extends ApiBase {
    proposeTour = (
        userId: number,
        token: string,
        requestBody: {
            departure_place: string;
            destination_places: string[];
            attractions: string[];
            departure_time: string;
            departure_date: string;
            time: string;
            max_number: number;
            note: string;
            user_id: number;
        }
    ) => {
        const url = `http://localhost:8080/api/v1/users/tours`;
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllPendingTours = () => {
        const url = 'http://localhost:8080/api/v1/tours/all/pending';
        return axios.get(url);
    };

    getAllSuccessTours = () => {
        const url = 'http://localhost:8080/api/v1/tours/all/success';
        return axios.get(url);
    };

    getAllRejectedTours = () => {
        const url = 'http://localhost:8080/api/v1/tours/all/reject';
        return axios.get(url);
    };

    getPendingTourByUser = (user_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}/pendingtour`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getRejectedTourByUser = (user_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}/rejectedTour`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getSuccessTourByUser = (user_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}/successTour`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    responseCustomTour = (
        tourId: number,
        requestBody: {
            user_id: number;
            status: 'reject' | 'success';
            reason?: string;
            price?: number;
        },
        token: string
    ) => {
        const url = `http://localhost:8080/api/v1/tours/${tourId}/response`;
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const customTourService = new CustomTourService();

export default customTourService;
