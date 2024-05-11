import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class MessageService extends ApiBase {
    createGroup = (requestBody: { tour_id: number; name: string }) => {
        const url = 'http://localhost:8080/api/v1/groups';
        return axios.post(url, requestBody);
    };

    addUserToGroup = (
        group_id: number,
        requestBody: {
            user_id: number;
        }
    ) => {
        const url = `http://localhost:8080/api/v1/groups/${group_id}`;
        return axios.post(url, requestBody);
    };

    createMessage = (requestBody: {
        group_id: number;
        user_id: number;
        content: string;
    }) => {
        const url = 'http://localhost:8080/api/v1/messages';
        return axios.post(url, requestBody);
    };

    getGroupById = (group_id: number) => {
        const url = `http://localhost:8080/api/v1/groups/${group_id}`;
        return axios.get(url);
    };

    getGroupByTourId = (tour_id: number) => {
        const url = `http://localhost:8080/api/v1/groups/tours/${tour_id}`;
        return axios.get(url);
    };

    getAllGroups = () => {
        const url = 'http://localhost:8080/api/v1/groups';
        return axios.get(url);
    };

    getAllGroupsByUserId = (user_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/user/${user_id}/groups`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllMessages = (group_id: number) => {
        const url = `http://localhost:8080/api/v1/groups/${group_id}/messages/`;
        return axios.get(url);
    };

    joinGroup = (
        group_id: number,
        requestBody: {
            user_id: number;
            tour_id: number;
            order_id: number;
        }
    ) => {
        const url = `http://localhost:8080/api/v1/groups/${group_id}/join`;
        return axios.post(url, requestBody);
    };
}

const messageService = new MessageService();

export default messageService;
