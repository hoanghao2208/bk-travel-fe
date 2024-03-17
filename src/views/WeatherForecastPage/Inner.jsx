import LocationIcon from 'assets/icons/LocationIcon';
import RainIconMini from 'assets/icons/WeatherIcon/IconMini/RainIconMini';
import SunCloudIconMini from 'assets/icons/WeatherIcon/IconMini/SunCloudIconMini';
import SunFewCloudIconMini from 'assets/icons/WeatherIcon/IconMini/SunFewCloudIconMini';
import SunRainIconMini from 'assets/icons/WeatherIcon/IconMini/SunRainIconMini';
import SunnyIconMini from 'assets/icons/WeatherIcon/IconMini/SunnyIconMini';
import ThunderIconMini from 'assets/icons/WeatherIcon/IconMini/ThunderIconMini';
import ThunderIcon from 'assets/icons/WeatherIcon/ThunderIcon';
import WeatherItem from 'components/WeatherItem';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect } from 'react';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Theo dõi thời tiết';
    });
    return (
        <UserHomePageLayout>
            <div className="weather-forecast__wrapper">
                <div className="weather-forecast">
                    <div className="weather-forecast__today">
                        <div className="weather-forecast__today--left">
                            <div className="weather-forecast__today--location">
                                <LocationIcon />
                                <span>TP. Hồ Chí Minh</span>
                            </div>
                            <p className="weather-forecast__today--status">
                                Trời nhiều mây
                            </p>
                            <div className="weather-forecast__today--info">
                                <span className="weather-forecast__today--temperature">
                                    26<span>°C</span>
                                </span>
                                <div className="weather-forecast__today--date">
                                    <span>Chủ nhật | </span>
                                    <span>12/10/2023</span>
                                </div>
                            </div>
                        </div>
                        <div className="weather-forecast__today--right">
                            <ThunderIcon />
                        </div>
                    </div>
                    <div className="weather-forecast__week">
                        <WeatherItem
                            date="Thứ hai"
                            day="12/10/2023"
                            icon={<SunCloudIconMini />}
                            minTemp={20}
                            maxTemp={32}
                        />
                        <WeatherItem
                            date="Thứ ba"
                            day="13/10/2023"
                            icon={<RainIconMini />}
                            minTemp={20}
                            maxTemp={32}
                        />
                        <WeatherItem
                            date="Thứ tư"
                            day="14/10/2023"
                            icon={<SunFewCloudIconMini />}
                            minTemp={20}
                            maxTemp={32}
                        />
                        <WeatherItem
                            date="Thứ năm"
                            day="15/10/2023"
                            icon={<SunCloudIconMini />}
                            minTemp={20}
                            maxTemp={32}
                        />
                        <WeatherItem
                            date="Thứ sáu"
                            day="16/10/2023"
                            icon={<SunnyIconMini />}
                            minTemp={20}
                            maxTemp={32}
                        />
                        <WeatherItem
                            date="Thứ bảy"
                            day="17/10/2023"
                            icon={<SunRainIconMini />}
                            minTemp={20}
                            maxTemp={32}
                        />
                        <WeatherItem
                            date="Chủ nhật"
                            day="18/10/2023"
                            icon={<ThunderIconMini />}
                            minTemp={20}
                            maxTemp={32}
                        />
                    </div>
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Weather Forecast Inner';

export default Inner;
