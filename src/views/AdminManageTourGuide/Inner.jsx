import { memo, useEffect } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Quản lý hướng dẫn viên';
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
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
            key: 'id',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            align: 'center',
            key: 'name',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'date',
            align: 'center',
            key: 'date',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            align: 'center',
            key: 'phone',
        },
        {
            title: 'Số tour được giao',
            dataIndex: 'task',
            align: 'center',
            key: 'task',
        },
        {
            align: 'center',
            key: 'action',
        },
    ];

    const data = [];
    return (
        <AdminLayout>
            <div className="admin-tour-guides">
                <div className="admin-tour-guides__header">
                    <h2 className="admin-tour-guides__header--title">
                        BK - Travel
                    </h2>
                    <div className="admin-tour-guides__header--btn">
                        <Button onClick={() => navigate('/admin/add-new-tour')}>
                            Thêm tour mới
                        </Button>
                    </div>
                </div>
                <div className="admin-tour-guides__content">
                    <h3 className="admin-tour-guides__content--title">
                        Danh sách tất cả các hướng dẫn viên trên hệ thống
                    </h3>
                    <div className="admin-tour-guides__content--table">
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Manage Tour Guide Inner';

export default Inner;
