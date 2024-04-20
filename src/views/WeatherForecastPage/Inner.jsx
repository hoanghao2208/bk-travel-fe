import { Select } from 'antd';
import LocationIcon from 'assets/icons/LocationIcon';
import dayjs from 'dayjs';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect, useMemo } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import { formattedDateTime } from 'utils/function/format';
import { renderIcon, renderStatus } from 'views/WeatherForecastPage/function';
import './style.scss';

const Inner = memo(
    ({
        mainInfor,
        sunInfor,
        windInfor,
        description,
        location,
        setLocation,
        allCities,
    }) => {
        useEffect(() => {
            document.title = 'Theo dõi thời tiết';
        });

        const filterOption = (input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

        const onChange = value => {
            setLocation(value);
        };

        const currentDayString = useMemo(() => {
            const currentDay = dayjs().day();
            switch (currentDay) {
                case 0:
                    return 'Chủ Nhật';
                case 1:
                    return 'Thứ Hai';
                case 2:
                    return 'Thứ Ba';
                case 3:
                    return 'Thứ Tư';
                case 4:
                    return 'Thứ Năm';
                case 5:
                    return 'Thứ Sáu';
                case 6:
                    return 'Thứ Bảy';
                default:
                    return '';
            }
        }, []);

        return (
            <UserHomePageLayout>
                <div className="weather-forecast__wrapper">
                    <div className="weather-forecast">
                        <div className="weather-forecast__today">
                            <div className="weather-forecast__today--left">
                                <div className="weather-forecast__today--location">
                                    <LocationIcon />
                                    <Select
                                        showSearch
                                        defaultValue={location}
                                        placeholder="Thành phố"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        filterOption={filterOption}
                                    >
                                        {allCities.map(city => (
                                            <Option key={city} value={city}>
                                                {city}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <p className="weather-forecast__today--status">
                                    {renderStatus(
                                        description.main,
                                        description.description
                                    )}
                                </p>
                                <div className="weather-forecast__today--info">
                                    <span className="weather-forecast__today--temperature">
                                        {Math.round(mainInfor?.temp) || '--'}
                                        <span>°C</span>
                                    </span>
                                    <div className="weather-forecast__today--date">
                                        <span>{currentDayString} | </span>
                                        <span>
                                            {dayjs().format(
                                                DEFAULT_DISPLAY_DATE_FORMAT
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="weather-forecast__today--right">
                                {renderIcon(
                                    description.main,
                                    description.description
                                )}
                            </div>
                        </div>
                        <div className="weather-forecast__inf">
                            <p>Thông tin chi tiết</p>
                            <div className="weather-forecast__inf--wrap">
                                <div>
                                    <span>Nhiệt độ hiện tại</span>
                                    <span>
                                        {Math.round(mainInfor?.temp) || '--'} °C
                                    </span>
                                </div>
                                <div>
                                    <span>Nhiệt độ cảm nhận được</span>
                                    <span>
                                        {Math.round(mainInfor?.feels_like) ||
                                            '--'}{' '}
                                        °C
                                    </span>
                                </div>
                                <div>
                                    <span>Nhiệt độ thấp nhất</span>
                                    <span>
                                        {Math.floor(mainInfor?.temp_min) ||
                                            '--'}{' '}
                                        °C
                                    </span>
                                </div>
                                <div>
                                    <span>Nhiệt độ cao nhất</span>
                                    <span>
                                        {Math.ceil(mainInfor?.temp_max) || '--'}{' '}
                                        °C
                                    </span>
                                </div>
                                <div>
                                    <span>Độ ẩm</span>
                                    <span>
                                        {Math.round(mainInfor?.humidity) ||
                                            '--'}{' '}
                                        g/m³
                                    </span>
                                </div>
                                <div>
                                    <span>Tốc độ gió</span>
                                    <span>{windInfor?.speed || '--'} m/s</span>
                                </div>
                                <div>
                                    <span>Bình minh</span>
                                    <span>
                                        {formattedDateTime(sunInfor.sunrise) ||
                                            '--'}
                                    </span>
                                </div>
                                <div>
                                    <span>Hoàng hôn</span>
                                    <span>
                                        {formattedDateTime(sunInfor.sunset) ||
                                            '--'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UserHomePageLayout>
        );
    }
);

Inner.displayName = 'Weather Forecast Inner';

export default Inner;
