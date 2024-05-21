import { Button, Form, Input, Modal, Select, Table } from 'antd';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useCallback, useEffect } from 'react';
import { EMAIL_VALIDATE } from 'utils/constants';
import './style.scss';

const Inner = memo(
    ({ form, modalTourguide, setModalTourguide, handleCreateTourguide }) => {
        useEffect(() => {
            document.title = 'Quản lý hướng dẫn viên';
        });
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

        const handleSubmitTourguide = useCallback(
            values => {
                handleCreateTourguide(values);
            },
            [handleCreateTourguide]
        );

        const data = [];
        return (
            <AdminLayout>
                <div className="admin-tour-guides">
                    <div className="admin-tour-guides__header">
                        <h2 className="admin-tour-guides__header--title">
                            BK - Travel
                        </h2>
                        <div className="admin-tour-guides__header--btn">
                            <Button onClick={() => setModalTourguide(true)}>
                                Thêm hướng dẫn viên
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
                    <Modal
                        open={modalTourguide}
                        title="Hướng dẫn viên mới"
                        // onOk={handleOk}
                        onCancel={() => setModalTourguide(false)}
                        className="add-tourguide-modal"
                        footer={[
                            <Button
                                key="back"
                                onClick={() => setModalTourguide(false)}
                            >
                                Hủy
                            </Button>,
                            <Button
                                htmlType="submit"
                                key="submit"
                                type="primary"
                                form="add-tourguide"
                                // onClick={handleOk}
                            >
                                Xác nhận
                            </Button>,
                        ]}
                    >
                        <Form
                            form={form}
                            name="add-tourguide"
                            layout="vertical"
                            id="add-tourguide"
                            onFinish={handleSubmitTourguide}
                            autoComplete="off"
                        >
                            <div className="modal-item">
                                <Form.Item
                                    label="Họ"
                                    name="firstname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ của HDV',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Họ" />
                                </Form.Item>
                                <Form.Item
                                    label="Tên"
                                    name="lastname"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tên của HDV',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Tên" />
                                </Form.Item>
                            </div>
                            <div className="modal-item">
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone_number"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập số điện thoại của HDV',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Số điện thoại" />
                                </Form.Item>
                                <Form.Item
                                    label="Giới tính"
                                    name="gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn giới tính',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Giới tính">
                                        <Option value="Nam">Nam</Option>
                                        <Option value="Nữ">Nữ</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="modal-item">
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập email của HDV',
                                        },
                                        {
                                            pattern: EMAIL_VALIDATE,
                                            message:
                                                'Email của bạn không hợp lệ',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Mật khẩu" />
                                </Form.Item>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </AdminLayout>
        );
    }
);

Inner.displayName = 'Admin Manage Tour Guide Inner';

export default Inner;
