import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class WeatherService extends ApiBase {
    getWeatherOfCity = (city: string) => {
        const url = 'http://localhost:8080/api/v1/schedule/weather';
        return axios.get(url, {
            params: {
                city,
            },
        });
    };
}

const weatherService = new WeatherService();

export default weatherService;
