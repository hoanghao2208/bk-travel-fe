import React, { FC, memo } from 'react';
import './styles.scss';

interface WeatherItemProps {
    date: string;
    day: string;
    icon: React.ReactNode;
    minTemp: number;
    maxTemp: number;
}

const WeatherItem: FC<WeatherItemProps> = memo(
    ({ date, day, icon, minTemp, maxTemp }) => {
        return (
            <div className="weather-item">
                <div className="weather-item__date">
                    <p>{date}</p>
                    <p>{day}</p>
                </div>
                <div className="weather-item__icon">{icon}</div>
                <div className="weather-item__temperature">
                    <p>
                        {minTemp}
                        <span>°C</span>
                    </p>
                    <p>
                        {maxTemp}
                        <span>°C</span>
                    </p>
                </div>
            </div>
        );
    }
);

WeatherItem.displayName = 'Weather Item';

export default WeatherItem;
