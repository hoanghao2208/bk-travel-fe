import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import weatherService from 'services/weatherService';
import Inner from 'views/WeatherForecastPage/Inner';

const Wrapper = memo(() => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [location, setLocation] = useState(
        Object.fromEntries(searchParams.entries()).city || 'Ho Chi Minh'
    );

    const [mainInfor, setMainInfor] = useState([]);
    const [sunInfor, setSunInfor] = useState([]);
    const [windInfor, setWindInfor] = useState([]);
    const [description, setDescription] = useState([]);

    const getWeatherInformation = useCallback(async () => {
        try {
            setSearchParams({ city: location });
            const response = await weatherService.getWeatherOfCity(location);
            if (response?.status === 200) {
                setMainInfor(response.data.data.main);
                setSunInfor(response.data.data.sys);
                setWindInfor(response.data.data.wind);
                setDescription(response.data.data.weather[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }, [location, setSearchParams]);

    useEffect(() => {
        getWeatherInformation();
    }, [getWeatherInformation]);

    return (
        <Inner
            mainInfor={mainInfor}
            sunInfor={sunInfor}
            windInfor={windInfor}
            description={description}
            location={location}
            setLocation={setLocation}
        />
    );
});

Wrapper.displayName = 'Weather Forecast';

const WeatherForecastPage = Wrapper;

export default WeatherForecastPage;
