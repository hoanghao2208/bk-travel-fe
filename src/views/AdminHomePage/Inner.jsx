import { Button, Table } from 'antd';
import Logo from 'assets/icons/Logo';
import MoneyIcon from 'assets/icons/MoneyIcon';
import PlaneIcon from 'assets/icons/PlaneIcon';
import TourGuideIcon from 'assets/icons/TourGuideIcon';
import TouristIcon from 'assets/icons/TouristIcon';
import InforItem from 'components/Admin/InforItem';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import './style.scss';

const Inner = memo(({ allTour, allTourguides, totalBooked, totalRevenue }) => {
    useEffect(() => {
        document.title = 'Trang chủ';
    });
    const navigate = useNavigate();

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            align: 'center',
            key: 'name',
        },
        {
            title: 'Tour du lịch',
            dataIndex: 'tour',
            align: 'center',
            key: 'tour',
        },
        {
            title: 'Điểm đến',
            dataIndex: 'destination',
            align: 'center',
            key: 'destination',
        },
        {
            title: 'Số hành khách',
            dataIndex: 'count',
            align: 'center',
            key: 'count',
        },
        {
            align: 'center',
            key: 'action',
        },
    ];

    const data = [];

    return (
        <AdminLayout>
            <div className="admin-homepage">
                <div className="admin-homepage__header">
                    <div className="admin-homepage__header-bg">
                        <div className="admin-homepage__header--logo">
                            <Logo />
                        </div>
                        <div className="admin-homepage__header--btn">
                            <Button
                                onClick={() =>
                                    navigate(routeConstants.ADMIN_ADD_NEW_TOUR)
                                }
                            >
                                Thêm tour mới
                            </Button>
                        </div>
                    </div>
                    <div className="admin-homepage__header-infor">
                        <div className="admin-homepage__header-infor--item">
                            <InforItem
                                itemTitle="Tổng số tour"
                                count={allTour?.length}
                                unit="Tours"
                                icon={<PlaneIcon />}
                            />
                        </div>
                        <div className="admin-homepage__header-infor--item">
                            <InforItem
                                itemTitle="Hướng dẫn viên"
                                count={allTourguides?.length}
                                unit="Hướng dẫn viên"
                                icon={<TourGuideIcon />}
                            />
                        </div>
                        <div className="admin-homepage__header-infor--item">
                            <InforItem
                                itemTitle="Số khách du lịch"
                                count={totalBooked}
                                unit="khách"
                                icon={<TouristIcon />}
                            />
                        </div>
                        <div className="admin-homepage__header-infor--item">
                            <InforItem
                                itemTitle="Doanh thu"
                                count={totalRevenue.toLocaleString()}
                                unit="VNĐ"
                                icon={<MoneyIcon />}
                            />
                        </div>
                    </div>
                </div>
                <div className="admin-homepage__content">
                    <h3 className="admin-homepage__content--title">
                        Danh sách tour được yêu thích nhất
                    </h3>
                    <div className="admin-homepage__content--table">
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Homepage Inner';

export default Inner;
