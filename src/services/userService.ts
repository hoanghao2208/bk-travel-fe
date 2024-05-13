import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class UserService extends ApiBase {
    register = (requestBody: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        confirm_password: string;
    }) => {
        const url = 'http://localhost:8080/api/v1/auth/register';
        return axios.post(url, requestBody);
    };

    login = (requestBody: { email: string; password: string }) => {
        const url = 'http://localhost:8080/api/v1/auth/login';
        return axios.post(url, requestBody);
    };

    logout = (token: string) => {
        const url = 'http://localhost:8080/api/v1/auth/logout';
        return axios.post(
            url,
            {},
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
    };

    getUserInfo = (user_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
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
        const url = `http://localhost:8080/api/v1/users/${user_id}`;
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    forgotPassword = (requestBody: { email: string }) => {
        const url = 'http://localhost:8080/api/v1/users/forgot-password';
        return axios.post(url, requestBody);
    };

    resetPassword = (
        requestBody: {
            code: string;
            new_password: string;
            confirm_password: string;
        },
        token: string
    ) => {
        const url = 'http://localhost:8080/api/v1/users/reset-password';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    uploadAvatar = (user_id: number, requestBody: any, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}/upload`;
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
        const url = 'http://localhost:8080/api/v1/users/change-password';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    addToWishList = (user_id: number, tour_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}/wishlist/tours/${tour_id}`;
        return axios.post(
            url,
            {},
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
    };

    getWishList = (user_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}/wishlist`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    removeFromWishList = (user_id: number, tour_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}/wishlist/tours/${tour_id}`;
        return axios.delete(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    addToCart = (
        token: string,
        requestBody: {
            user_id: number;
            tour: {
                tour_id: number | null;
                adult_quantity: number;
                child_quantity: number;
            };
        }
    ) => {
        const url = 'http://localhost:8080/api/v1/users/carts';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getCartByUser = (user_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/${user_id}/cart`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    deleteFromCart = (cart_id: number, tour_id: number, token: string) => {
        const url = `http://localhost:8080/api/v1/users/carts/${cart_id}`;
        return axios.delete(url, {
            data: { tour_id },
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    increaseAdultQuantity = (
        token: string,
        requestBody: {
            user_id: number;
            tour_id: number;
        }
    ) => {
        const url =
            'http://localhost:8080/api/v1/users/carts/order-item/adult-quantity/increment';
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    decreaseAdultQuantity = (
        token: string,
        requestBody: {
            user_id: number;
            tour_id: number;
        }
    ) => {
        const url =
            'http://localhost:8080/api/v1/users/carts/order-item/adult-quantity/decrement';
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    increaseChildQuantity = (
        token: string,
        requestBody: {
            user_id: number;
            tour_id: number;
        }
    ) => {
        const url =
            'http://localhost:8080/api/v1/users/carts/order-item/child-quantity/increment';
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    decreaseChildQuantity = (
        token: string,
        requestBody: {
            user_id: number;
            tour_id: number;
        }
    ) => {
        const url =
            'http://localhost:8080/api/v1/users/carts/order-item/child-quantity/decrement';
        return axios.put(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const userService = new UserService();

export default userService;
