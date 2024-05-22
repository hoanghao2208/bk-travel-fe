import { Button, DatePicker, Form, Select } from 'antd';
import TourItem from 'components/TourItem';
import dayjs from 'dayjs';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './style.scss';

const Inner = memo(({ searchResults, allDestinations, handleFilterTours }) => {
    useEffect(() => {
        document.title = 'Kết quả tìm kiếm';
    });

    const [searchParams] = useSearchParams();

    const { departure_place, destination_place, departure_date, time } =
        Object.fromEntries(searchParams.entries());

    const timeOptions = useMemo(() => {
        const timeOpts = [];
        for (let i = 0; i < 10; i++) {
            let newOpt;
            if (i === 0) {
                newOpt = {
                    value: `${i + 1} ngày`,
                };
            } else {
                newOpt = {
                    value: `${i + 1} ngày, ${i} đêm`,
                };
            }
            timeOpts.push(newOpt);
        }
        return timeOpts;
    }, []);

    const onFinish = useCallback(
        values => {
            handleFilterTours(values);
        },
        [handleFilterTours]
    );

    return (
        <UserHomePageLayout>
            <div className="search-result">
                <div className="search-result__filter">
                    <h3 className="search-result__filter--title">
                        Lọc kết quả
                    </h3>
                    <div className="search-result__filter--box">
                        <Form
                            name="filter-tour"
                            layout="vertical"
                            id="filter-tour"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="departure_place"
                                label="Điểm khởi hành"
                                initialValue={departure_place}
                            >
                                <Select
                                    placeholder="Điểm khởi hành"
                                    defaultValue={departure_place}
                                    allowClear
                                >
                                    {allDestinations.map(destination => (
                                        <Option
                                            key={destination.destination_id}
                                            value={destination.name}
                                        >
                                            {destination.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="destination_place"
                                label="Điểm đến"
                                initialValue={destination_place}
                            >
                                <Select
                                    placeholder="Điểm đến"
                                    defaultValue={destination_place}
                                    allowClear
                                >
                                    {allDestinations.map(destination => (
                                        <Option
                                            key={destination.destination_id}
                                            value={destination.name}
                                        >
                                            {destination.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="departure_date"
                                label="Ngày khởi hành"
                                initialValue={
                                    departure_date !== undefined &&
                                    dayjs(departure_date)
                                }
                            >
                                <DatePicker
                                    placeholder="Ngày khởi hành"
                                    format={DEFAULT_DISPLAY_DATE_FORMAT}
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item
                                name="time"
                                label="Thời gian tour"
                                initialValue={time}
                            >
                                <Select
                                    placeholder="Thời gian tour"
                                    allowClear
                                    defaultValue={time}
                                >
                                    {timeOptions.map(item => (
                                        <Option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                            >
                                Tìm kiếm
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className="search-result__results">
                    <h3 className="search-result__results--title">
                        Chúng tôi tìm thấy{' '}
                        <span className="search-result__results--number">
                            {searchResults?.length} tours
                        </span>{' '}
                        phù hợp với nhu cầu của bạn
                    </h3>
                    <p className="search-result__results--count"></p>
                    <div className="search-result__results--list">
                        {searchResults &&
                            searchResults.length > 0 &&
                            searchResults.map(tour => (
                                <div
                                    className="search-result__results--item"
                                    key={tour.tour_id}
                                >
                                    <TourItem
                                        haveBtn={true}
                                        bgItem={true}
                                        tourId={tour.tour_id}
                                        imgURL={tour.cover_image}
                                        departureTime={dayjs(
                                            tour.departure_date
                                        ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                        time={tour.time}
                                        tourName={tour.name}
                                        departurePlace={tour.departure_place}
                                        empty={
                                            tour.max_customer -
                                            tour.booked_number
                                        }
                                        deadlineBookTime={dayjs(
                                            tour.deadline_book_time
                                        ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                        price={parseInt(tour.price)}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Search Results Inner';

export default Inner;
