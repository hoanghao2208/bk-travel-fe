import { memo, useEffect } from 'react';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import FilterItem from 'components/FilterItem';
import { Button, Pagination } from 'antd';
import TourItem from 'components/TourItem';
import './style.scss';

const Inner = memo(() => {
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
                        <div className="search-result__filter--item">
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
                        </div>
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
                        Danh sách các tour du lịch Đà Nẵng khởi hành từ TP. Hồ
                        Chí Minh
                    </h3>
                    <p className="search-result__results--desc">
                        Đà Nẵng nằm giữa ba di sản thế giới: cố đô Huế, phố cổ
                        Hội An và thánh địa Mỹ Sơn. Đà Nẵng còn có nhiều danh
                        thắng tuyệt đẹp say lòng du khách như Ngũ Hành Sơn, Bà
                        Nà, bán đảo Sơn Trà, đèo Hải Vân, sông Hàn thơ mộng và
                        cầu quay Sông Hàn – niềm tự hào của thành phố, và biển
                        Mỹ Khê đẹp nhất hành tinh.
                        <br />
                        Đăng ký tour Đà Nẵng cùng BK - Travel, Quý khách có thể
                        đến khám phá các điểm đến nổi bật sau: Bà Nà Hills, Cầu
                        quay sông Hàn, Ngũ Hành Sơn, Bán đảo Sơn Trà, ...
                    </p>
                    <p className="search-result__results--count">
                        Chúng tôi tìm thấy{' '}
                        <span className="search-result__results--number">
                            52 tours
                        </span>{' '}
                        phù hợp với yêu cầu
                    </p>
                    <div className="search-result__results--list">
                        <div className="search-result__results--item">
                            <TourItem />
                        </div>
                        <div className="search-result__results--item">
                            <TourItem />
                        </div>
                        <div className="search-result__results--item">
                            <TourItem />
                        </div>
                        <div className="search-result__results--item">
                            <TourItem />
                        </div>
                        <div className="search-result__results--item">
                            <TourItem />
                        </div>
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
