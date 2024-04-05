import { Button, Pagination } from 'antd';
import FilterItem from 'components/FilterItem';
import TourItem from 'components/TourItem';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect } from 'react';
import './style.scss';
import dayjs from 'dayjs';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';

const Inner = memo(({ searchResults }) => {
    useEffect(() => {
        document.title = 'Kết quả tìm kiếm';
    });
    return (
        <UserHomePageLayout>
            <div className="search-result">
                <div className="search-result__filter">
                    <h3 className="search-result__filter--title">
                        Lọc kết quả
                    </h3>
                    <div className="search-result__filter--box">
                        {/* <div className="search-result__filter--item">
                            <FilterItem
                                filterTitle="Loại hình tour"
                                isSelectedDate={false}
                                isPrice={false}
                                options={[
                                    {
                                        value: 'trongoi',
                                        label: 'Tour trọn gói',
                                    },
                                    {
                                        value: 'tourdoan',
                                        label: 'Tour đoàn',
                                    },
                                    {
                                        value: 'tourle',
                                        label: 'Tour lẻ',
                                    },
                                ]}
                            />
                        </div> */}
                        <div className="search-result__filter--item">
                            <FilterItem
                                filterTitle="Điểm khởi hành"
                                isSelectedDate={false}
                                isPrice={false}
                                options={[
                                    {
                                        value: 'tphcm',
                                        label: 'TP. Hồ Chí Minh',
                                    },
                                    {
                                        value: 'dn',
                                        label: 'Đà Nẵng',
                                    },
                                    {
                                        value: 'nt',
                                        label: 'Nha Trang',
                                    },
                                    {
                                        value: 'pt',
                                        label: 'Phan Thiết',
                                    },
                                ]}
                            />
                        </div>
                        <div className="search-result__filter--item">
                            <FilterItem
                                filterTitle="Điểm đến"
                                isSelectedDate={false}
                                isPrice={false}
                                options={[
                                    {
                                        value: 'tphcm',
                                        label: 'TP. Hồ Chí Minh',
                                    },
                                    {
                                        value: 'dn',
                                        label: 'Đà Nẵng',
                                    },
                                    {
                                        value: 'nt',
                                        label: 'Nha Trang',
                                    },
                                    {
                                        value: 'pt',
                                        label: 'Phan Thiết',
                                    },
                                ]}
                            />
                        </div>
                        <div className="search-result__filter--item">
                            <FilterItem
                                filterTitle="Thời gian tour"
                                isSelectedDate={false}
                                isPrice={false}
                                options={[
                                    {
                                        value: '2n1d',
                                        label: '2 ngày, 1 đêm',
                                    },
                                    {
                                        value: '3n2d',
                                        label: '3 ngày, 2 đêm',
                                    },
                                    {
                                        value: '4n3d',
                                        label: '4 ngày, 3 đêm',
                                    },
                                    {
                                        value: '>5n',
                                        label: 'Hơn 5 ngày',
                                    },
                                ]}
                            />
                        </div>
                        <div className="search-result__filter--item">
                            <FilterItem
                                filterTitle="Ngày khởi hành"
                                isSelectedDate={true}
                                isPrice={false}
                            />
                        </div>
                        <div className="search-result__filter--item">
                            <FilterItem
                                filterTitle="Số lượng hành khách"
                                isSelectedDate={false}
                                isPrice={false}
                                options={[
                                    {
                                        value: '1-3',
                                        label: '1-3 người',
                                    },
                                    {
                                        value: '3-7',
                                        label: '3-7 người',
                                    },
                                    {
                                        value: '7-15',
                                        label: '7-15 người',
                                    },
                                    {
                                        value: '>15',
                                        label: 'Hơn 15 người',
                                    },
                                ]}
                            />
                            <div className="search-result__filter--item">
                                <FilterItem
                                    filterTitle="Giá tour"
                                    isSelectedDate={false}
                                    isPrice={true}
                                />
                            </div>
                            <div className="search-result__filter--button">
                                <Button type="primary">Áp dụng</Button>
                            </div>
                        </div>
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
                                            tour.current_customers
                                        }
                                        deadlineBookTime={dayjs(
                                            tour.deadline_book_time
                                        ).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                        price={tour.price}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className="search-result__results--pagination">
                        <Pagination
                            showSizeChanger
                            defaultCurrent={1}
                            total={20}
                        />
                    </div>
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Search Results Inner';

export default Inner;
