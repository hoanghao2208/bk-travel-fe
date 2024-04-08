import { Form } from 'antd';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

export interface ITour {
    tour_id: number;
    name: string;
    cover_image: string;
    current_customers: number;
    max_customer: number;
    departure_place: string;
    departure_date: string;
    time: string;
    deadline_book_time: string;
    price: string;
}

export interface IPassengerNumber {
    value: number;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
}
