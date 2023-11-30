import { memo } from 'react';
import Inner from 'views/WeatherForecastPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Weather Forecast';

const WeatherForecastPage = Wrapper;

export default WeatherForecastPage;
