import { memo } from 'react';
import Inner from 'views/AdminWeatherForecast/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Admin Weather Forecast';

const AdminWeatherForecast = Wrapper;

export default AdminWeatherForecast;
