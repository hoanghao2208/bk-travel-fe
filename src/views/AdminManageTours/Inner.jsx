import { memo, useEffect } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Quản lý tours';
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
            title: 'Khởi hành',
            dataIndex: 'departure',
            align: 'center',
            key: 'departure',
        },
        {
            title: 'Điểm đến',
            dataIndex: 'destination',
            align: 'center',
            key: 'destination',
        },
        {
            title: 'Ngày khởi hành',
            dataIndex: 'date',
            align: 'center',
            key: 'date',
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
            <div className="manage-tours">
                <div className="manage-tours__header">
                    <h2 className="manage-tours__header--title">BK - Travel</h2>
                    <div className="manage-tours__header--btn">
                        <Button onClick={() => navigate('/admin/add-new-tour')}>
                            Thêm tour mới
                        </Button>
                    </div>
                </div>
                <div className="manage-tours__content">
                    <h3 className="manage-tours__content--title">
                        Danh sách tất cả các tour trên hệ thống
                    </h3>
                    <div className="admin-homepage__content--table">
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Manage Tours Inner';

export default Inner;
