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
        },
        token: string
    ) => {
        const url = `http://localhost:8080/api/v1/user/update/${user_id}`;
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
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

    changePassword = (
        requestBody: {
            old_password: string;
            new_password: string;
            confirm_password: string;
            email: string;
        },
        token: string
    ) => {
        const url = 'http://localhost:8080/api/v1/user/change-password';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    addToWishList = (user_id: number, tour_id: number) => {
        const url = `http://localhost:8080/api/v1/user/wishlist/${user_id}/tours/${tour_id}`;
        return axios.post(url);
    };

    getWishList = (user_id: number) => {
        const url = `http://localhost:8080/api/v1/user/wishlist/${user_id}`;
        return axios.get(url);
    };

    removeFromWishList = (user_id: number, tour_id: number) => {
        const url = `http://localhost:8080/api/v1/user/wishlist/${user_id}/tours/${tour_id}`;
        return axios.delete(url);
    };

    addToCart = (requestBody: {
        user_id: number;
        tour: {
            tour_id: number | null;
            adult_quantity: number;
            child_quantity: number;
        };
    }) => {
        const url = 'http://localhost:8080/api/v1/user/cart';
        return axios.post(url, requestBody);
    };
}

const userService = new UserService();

export default userService;
