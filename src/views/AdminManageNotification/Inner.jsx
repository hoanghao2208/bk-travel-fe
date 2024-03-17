import { DatePicker, Form, Select, Table } from 'antd';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useEffect, useRef } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Quản lý thông báo';
    });
    const formRef = useRef(null);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            align: 'center',
            key: 'name',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            align: 'center',
            key: 'title',
        },
        {
            title: 'Ngày gửi',
            dataIndex: 'date',
            align: 'center',
            key: 'date',
        },
        {
            title: 'Loại thông báo',
            dataIndex: 'type',
            align: 'center',
            key: 'type',
        },
        {
            title: 'Người nhận',
            dataIndex: 'recipient',
            align: 'center',
            key: 'recipient',
        },
        {
            align: 'center',
            key: 'action',
        },
    ];

    const data = [];

    return (
        <AdminLayout>
            <div className="admin-manage-notice">
                <div className="admin-manage-notice__header">
                    <h1 className="admin-manage-notice__header--title">
                        quản lý thông báo
                    </h1>
                </div>
                <div className="admin-manage-notice__filter">
                    <Form
                        ref={formRef}
                        name="tour-filter"
                        layout="vertical"
                        // onFinish={onFinish}
                    >
                        <div className="admin-manage-notice__filter--wrapper">
                            <div className="admin-manage-notice__filter--item">
                                <Form.Item
                                    label="Ngày gửi thông báo"
                                    name="day"
                                >
                                    <DatePicker
                                        placeholder="Ngày gửi thông báo"
                                        format={DEFAULT_DISPLAY_DATE_FORMAT}
                                    />
                                </Form.Item>
                            </div>
                            <div className="admin-manage-notice__filter--item">
                                <Form.Item
                                    label="Loại thông báo"
                                    name="notice-type"
                                >
                                    <Select placeholder="Loại thông báo">
                                        <Option value="kehoach">
                                            Kế hoạch
                                        </Option>
                                        <Option value="notice">
                                            Thông báo
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="admin-manage-notice__table">
                    <h3 className="admin-manage-notice__table--title">
                        Danh sách tất cả các tất cả thông báo đã gửi
                    </h3>
                    <div className="admin-manage-notice__table--table">
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Management Notification Inner';

export default Inner;
