import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

const _USER_PATH = 'user';
const _OAUTH_PATH = '/oauth';
const _TOUR = '/tour';
const _AUTH = 'auth';

class UserService extends ApiBase {
    me = () => {
        const url = `${_USER_PATH}/get/me`;
        return this.get(url);
    };

    register = (requestBody: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        confirm_password: string;
    }) => {
        const url = `/v1/${_AUTH}/register`;
        const res = this.post(url, requestBody);
        return res;
    };

    login = (requestBody: { email: string; password: string }) => {
        const url = `/v1/${_AUTH}/login`;
        const res = this.post(url, requestBody);
        return res;
    };

    getUserInfo = (user_id: number) => {
        const url = `/v1/${_USER_PATH}/${user_id}`;
        const res = this.get(url);
        return res;
    };

    updateUserInfo = (
        user_id: number,
        requestBody: {
            firstname: string;
            lastname: string;
            email: string;
            dob: string;
            phone_number: string;
            gender: string;
        }
    ) => {
        const url = `/v1/${_USER_PATH}/update/${user_id}`;
        const res = this.post(url, requestBody);
        return res;
    };

    forgotPassword = (requestBody: { email: string }) => {
        const url = `/v1/${_USER_PATH}/forgot-password`;
        const res = this.post(url, requestBody);
        return res;
    };

    resetPassword = (requestBody: {
        code: string;
        new_password: string;
        confirm_password: string;
    }) => {
        const url = `/v1/${_USER_PATH}/reset-password`;
        const res = this.post(url, requestBody);
        return res;
    };

    uploadAvatar = (user_id: number, requestBody: any, token: string) => {
        const url = `http://localhost:8080/api/v1/user/upload/${user_id}`;
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const userService = new UserService();

export default userService;
