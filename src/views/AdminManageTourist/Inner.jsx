import { memo, useEffect, useRef } from 'react';
import { Form, DatePicker, Select } from 'antd';
import AdminLayout from 'layouts/AdminLayout';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import TourItem from 'components/Admin/TourItem';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Quản lý du khách';
    });
    const formRef = useRef(null);
    const filterOption = (input, option) => {
        return (option?.label ?? '')
            .toLowerCase()
            .includes(input.toLowerCase());
    };

    const filterSort = (optionA, optionB) => {
        return (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase());
    };

    return (
        <AdminLayout>
            <div className="admin-manage-tourist">
                <div className="admin-manage-tourist__header">
                    <h1 className="admin-manage-tourist__header--title">
                        quản lý du khách
                    </h1>
                    <p className="admin-manage-tourist__header--intro">
                        Vui lòng chọn tour cụ thể để xem chi tiết.
                    </p>
                </div>
                <div className="admin-manage-tourist__filter">
                    <Form
                        ref={formRef}
                        name="tour-filter"
                        layout="vertical"
                        // onFinish={onFinish}
                    >
                        <div className="admin-manage-tourist__filter--wrapper">
                            <div className="admin-manage-tourist__filter--item">
                                <Form.Item
                                    label="Điểm khởi hành"
                                    name="departure"
                                >
                                    <Select
                                        showSearch
                                        placeholder="Điểm khởi hành"
                                        optionFilterProp="children"
                                        // onChange={onChange}
                                        // onSearch={onSearch}
                                        filterOption={filterOption}
                                        filterSort={filterSort}
                                        options={[
                                            {
                                                value: 'hcm',
                                                label: 'TP. Hồ Chí Minh',
                                            },
                                            {
                                                value: 'dn',
                                                label: 'Đà Nẵng',
                                            },
                                            {
                                                value: 'vt',
                                                label: 'Vũng Tàu',
                                            },
                                            {
                                                value: 'nt',
                                                label: 'Nha Trang',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <div className="admin-manage-tourist__filter--item">
                                <Form.Item label="Điểm đến" name="destination">
                                    <Select
                                        showSearch
                                        placeholder="Điểm đến"
                                        optionFilterProp="children"
                                        // onChange={onChange}
                                        // onSearch={onSearch}
                                        filterOption={filterOption}
                                        filterSort={filterSort}
                                        options={[
                                            {
                                                value: 'hcm',
                                                label: 'TP. Hồ Chí Minh',
                                            },
                                            {
                                                value: 'dn',
                                                label: 'Đà Nẵng',
                                            },
                                            {
                                                value: 'vt',
                                                label: 'Vũng Tàu',
                                            },
                                            {
                                                value: 'nt',
                                                label: 'Nha Trang',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <div className="admin-manage-tourist__filter--item">
                                <Form.Item label="Ngày khởi hành" name="day">
                                    <DatePicker
                                        placeholder="Ngày khởi hành"
                                        format={DEFAULT_DISPLAY_DATE_FORMAT}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="admin-manage-tourist__content">
                    <div className="admin-manage-tourist__content--item">
                        <TourItem
                            imgURL="/images/slide5.jpg"
                            date="12/10/2023"
                            type="3 ngày, 2 đêm"
                            tourName="Đà Nẵng – KDL Bà Nà – Sơn Trà – Hội An – La Vang - Động Phong Nha – Làng hương Thủy Xuân - Huế"
                            departure="TP. Hồ Chí Minh"
                            destination="Đà Nẵng"
                        />
                    </div>
                    <div className="admin-manage-tourist__content--item">
                        <TourItem
                            imgURL="/images/slide4.jpg"
                            date="12/10/2023"
                            type="3 ngày, 2 đêm"
                            tourName="Đà Nẵng – KDL Bà Nà – Sơn Trà – Hội An – La Vang - Động Phong Nha – Làng hương Thủy Xuân - Huế"
                            departure="TP. Hồ Chí Minh"
                            destination="Đà Nẵng"
                        />
                    </div>
                    <div className="admin-manage-tourist__content--item">
                        <TourItem
                            imgURL="/images/slide2.jpg"
                            date="12/10/2023"
                            type="3 ngày, 2 đêm"
                            tourName="Đà Nẵng – KDL Bà Nà – Sơn Trà – Hội An – La Vang - Động Phong Nha – Làng hương Thủy Xuân - Huế"
                            departure="TP. Hồ Chí Minh"
                            destination="Đà Nẵng"
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Manage Tourist Inner';

export default Inner;
