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
    const [allCities, setAllCities] = useState([]);

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

    const getAllCities = useCallback(async () => {
        try {
            const response = await weatherService.getAllCities();
            if (response?.status === 200) {
                setAllCities(Object.values(response.data.cities));
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getWeatherInformation();
    }, [getWeatherInformation]);

    useEffect(() => {
        getAllCities();
    }, [getAllCities]);

    return (
        <Inner
            mainInfor={mainInfor}
            sunInfor={sunInfor}
            windInfor={windInfor}
            description={description}
            location={location}
            setLocation={setLocation}
            allCities={allCities}
        />
    );
});

Wrapper.displayName = 'Weather Forecast';

const WeatherForecastPage = Wrapper;

export default WeatherForecastPage;
