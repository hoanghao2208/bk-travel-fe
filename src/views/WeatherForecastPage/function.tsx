import CloudIcon from 'assets/icons/WeatherIcon/CloudIcon';
import RainIcon from 'assets/icons/WeatherIcon/RainIcon';
import SunCloudIcon from 'assets/icons/WeatherIcon/SunCloudIcon';
import SunIcon from 'assets/icons/WeatherIcon/SunIcon';

export const renderIcon = (mainWeather: string, description?: string) => {
    if (mainWeather === 'Clouds') {
        if (description === 'scattered clouds') {
            return <SunCloudIcon />;
        } else if (description === 'overcast clouds') {
            return <CloudIcon />;
        }
        return <SunCloudIcon />;
    } else if (mainWeather === 'Rain') return <RainIcon />;
    else if (mainWeather === 'Clear') return <SunIcon />;
};

export const renderStatus = (mainWeather: string, description?: string) => {
    if (mainWeather === 'Clouds') {
        if (description === 'scattered clouds') {
            return 'Trời có mây rải rác';
        } else if (description === 'overcast clouds') {
            return 'Trời có nhiều mây';
        }
        return 'Trời có mây';
    } else if (mainWeather === 'Rain') return 'Trời mưa';
    else if (mainWeather === 'Clear') return 'Thời tiết trong lành';
};
