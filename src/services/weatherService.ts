import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';
import { BASE_URL } from 'utils/constants';

class WeatherService extends ApiBase {
    getWeatherOfCity = (city: string) => {
        const url = BASE_URL + '/api/v1/schedules/weather';
        return axios.get(url, {
            params: {
                city,
            },
        });
    };

    getAllCities = () => {
        const url = BASE_URL + '/api/v1/destinations/cities';
        return axios.get(url);
    };
}

const weatherService = new WeatherService();

export default weatherService;
