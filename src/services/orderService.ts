import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';
import { BASE_URL } from 'utils/constants';

class OrderService extends ApiBase {
    getOneOrder = (orderId: number, token: string) => {
        const url = BASE_URL + `/api/v1/orders/${orderId}`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getCompletedOrder = (userId: number, token: string) => {
        const url = BASE_URL + `/api/v1/orders/${userId}/complete`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getPendingOrder = (userId: number, token: string) => {
        const url = BASE_URL + `/api/v1/orders/${userId}/pending`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getCanceledOrder = (userId: number, token: string) => {
        const url = BASE_URL + `/api/v1/orders/${userId}/canceled`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    }

    createOneOrder = (
        requestBody: {
            user_id: number;
            child_quantity: number;
            adult_quantity: number;
            tour_id: number | null;
            name_customer: string;
            phone_customer: string;
            address_customer: string;
        },
        token: string
    ) => {
        const url = BASE_URL + '/api/v1/orders';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    createCartOrder = (
        requestBody: {
            user_id: number;
            order_items: number[];
            name_customer: string;
            phone_customer: string;
            address_customer: string;
        },
        token: string
    ) => {
        const url = BASE_URL + '/api/v1/orders/carts';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    paymentDirectly = (
        requestBody: { user_id: number; order_id: number },
        token: string
    ) => {
        const url = BASE_URL + '/api/v1/orders/payments';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getResultsPayment = (params: any, token: string) => {
        const url = BASE_URL + `/api/v1/users/payment/vnpay_ipn${params}`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    deleteOrderItem = (
        token: string,
        cart_id: number,
        requestBody: {
            tour_id: number;
        }
    ) => {
        const url = BASE_URL + `/api/v1/users/carts/${cart_id}`;
        return axios.delete(url, {
            data: requestBody,
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    cancelOrder = (
        requestBody: {
            order_id: number;
            payment_id: number;
        },
        token: string
    ) => {
        const url = BASE_URL + '/api/v1/users/payment/refund';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getResultsCancelOrder = (params: any, token: string) => {
        const url = BASE_URL + `/api/v1/users/payment/refund${params}`;
        return axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const orderService = new OrderService();

export default orderService;
