import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class OrderService extends ApiBase {
    getOneOrder = (orderId: number) => {
        const url = `http://localhost:8080/api/v1/order/${orderId}`;
        return axios.get(url);
    };

    createOneOrder = (requestBody: {
        user_id: number;
        child_quantity: number;
        adult_quantity: number;
        tour_id: number | null;
        name_customer: string;
        phone_customer: string;
        address_customer: string;
    }) => {
        const url = 'http://localhost:8080/api/v1/order';
        return axios.post(url, requestBody);
    };

    createCartOrder = (requestBody: {
        user_id: number;
        order_items: number[];
        name_customer: string;
        phone_customer: string;
        address_customer: string;
    }) => {
        const url = 'http://localhost:8080/api/v1/order/create-from-cart';
        return axios.post(url, requestBody);
    };

    paymentDirectly = (requestBody: { user_id: number; order_id: number }) => {
        const url = 'http://localhost:8080/api/v1/order/payment';
        return axios.post(url, requestBody);
    };
}

const orderService = new OrderService();

export default orderService;
