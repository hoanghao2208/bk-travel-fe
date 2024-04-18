import CloudIcon from 'assets/icons/WeatherIcon/CloudIcon';
import RainIcon from 'assets/icons/WeatherIcon/RainIcon';
import SunIcon from 'assets/icons/WeatherIcon/SunIcon';

export const renderIcon = (mainWeather: string) => {
    if (mainWeather === 'Clouds') return <CloudIcon />;
    else if (mainWeather === 'Rain') return <RainIcon />;
    else if (mainWeather === 'Clear') return <SunIcon />;
};

export const renderStatus = (mainWeather: string) => {
    if (mainWeather === 'Clouds') return 'Trời có mây';
    else if (mainWeather === 'Rain') return 'Trời mưa';
    else if (mainWeather === 'Clear') return 'Trời trong lành, nắng đẹp';
};
