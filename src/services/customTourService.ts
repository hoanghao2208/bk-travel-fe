import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class CustomTourService extends ApiBase {
    proposeTour = (
        userId: number,
        token: string,
        requestBody: {
            departure_place: string;
            destination_places: string[];
            attractions: string[];
            departure_time: string;
            departure_date: string;
            time: string;
            max_number: number;
            note: string;
            user_id: number;
        }
    ) => {
        const url = `http://localhost:8080/api/v1/user/${userId}/tour`;
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const customTourService = new CustomTourService();

export default customTourService;
