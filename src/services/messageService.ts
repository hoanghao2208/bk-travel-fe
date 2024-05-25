import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';
import { BASE_URL } from 'utils/constants';

class MessageService extends ApiBase {
    createGroup = (
        token: string,
        requestBody: { tour_id: number; name: string }
    ) => {
        const url = BASE_URL + '/api/v1/groups';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    joinGroup = (
        group_id: number,
        requestBody: {
            user_id: number;
            tour_id: number;
            order_id: number;
        },
        token: string
    ) => {
        const url = BASE_URL + `/api/v1/groups/${group_id}/join`;
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    addUserToGroup = (
        group_id: number,
        requestBody: {
            user_id: number;
        },
        token: string
    ) => {
        const url = BASE_URL + `/api/v1/groups/${group_id}`;
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    createMessage = (
        requestBody: {
            group_id: number;
            user_id: number;
            content: string;
        },
        token: string
    ) => {
        const url = BASE_URL + '/api/v1/messages';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getGroupById = (group_id: number, token: string) => {
        const url = BASE_URL + `/api/v1/groups/${group_id}`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getGroupByTourId = (tour_id: number, token: string) => {
        const url = BASE_URL + `/api/v1/groups/tours/${tour_id}`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllGroups = (token: string) => {
        const url = BASE_URL + '/api/v1/groups';
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllGroupsByUserId = (user_id: number, token: string) => {
        const url = BASE_URL + `/api/v1/users/${user_id}/groups`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllMessages = (group_id: number, token: string) => {
        const url = BASE_URL + `/api/v1/groups/${group_id}/messages`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const messageService = new MessageService();

export default messageService;
