import ApiBase from 'modules/apis/apiBase';

const _USER_PATH = '/users';
const _OAUTH_PATH = '/oauth';
const _TOUR = '/tour';

class UserService extends ApiBase {
    me = () => {
        const url = `${_USER_PATH}/get/me`;
        return this.get(url);
    };

    register = (requestBody: {
        firstname: string;
        lastname: string;
        gmail: string;
        password: string;
        confirm_password: string;
    }) => {
        const url = `${_TOUR}/register`;
        const res = this.post(url, requestBody);
        return res;
    };

    login = (requestBody: { gmail: string; password: string }) => {
        const url = `${_TOUR}/login`;
        const res = this.post(url, requestBody);
        return res;
    };
}

const userService = new UserService();

export default userService;
