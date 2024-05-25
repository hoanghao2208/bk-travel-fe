import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';
import { BASE_URL } from 'utils/constants';

class TourGuideService extends ApiBase {
    getAllTourGuides = (token: string) => {
        const url = BASE_URL + '/api/v1/tour_guides';
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
        const url = BASE_URL + '/admin/manage-account';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    assignTask = (
        requestBody: {
            tour_id: number;
            number: number;
            listTourGuides: string[];
            description: string;
        },
        token: string
    ) => {
        const url = BASE_URL + '/admin/task';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllTasksOfTourGuide = (tourGuide_id: number, token: string) => {
        const url = BASE_URL + `/api/v1/tour_guides/${tourGuide_id}/tasks`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    updateScheduleByTourGuide = (
        schedule_id: number,
        requestBody: {
            tour_id: number;
            schedule_detail: any;
        },
        token: string
    ) => {
        const url = BASE_URL + `/api/v1/schedules/tourguide/${schedule_id}`;
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const tourGuideService = new TourGuideService();

export default tourGuideService;
