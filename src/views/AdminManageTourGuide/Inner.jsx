import { Button, Form, Input, Modal, Select, Table } from 'antd';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useCallback, useEffect } from 'react';
import { EMAIL_VALIDATE } from 'utils/constants';
import './style.scss';

const Inner = memo(
    ({
        form,
        tourguideData,
        modalTourguide,
        setModalTourguide,
        handleCreateTourguide,
    }) => {
        useEffect(() => {
            document.title = 'Quản lý hướng dẫn viên';
        });
        const columns = [
            {
                title: 'STT',
                align: 'center',
                render: (text, record, index) => index + 1,
            },
            {
                title: 'Họ và tên',
                align: 'center',
                render: (_, col) => {
                    return (
                        <span>
                            {col.firstname + ' '}
                            {col.lastname}
                        </span>
                    );
                },
            },
            {
                title: 'Giới tính',
                dataIndex: 'gender',
                align: 'center',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                align: 'center',
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone_number',
                align: 'center',
            },
            {
                title: 'Số tour được giao',
                dataIndex: 'task',
                align: 'center',
            },
        ];

        const handleSubmitTourguide = useCallback(
            values => {
                handleCreateTourguide(values);
            },
            [handleCreateTourguide]
        );

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
                            <Table
                                columns={columns}
                                dataSource={tourguideData}
                                pagination={false}
                            />
                        </div>
                    </div>
                    <Modal
                        open={modalTourguide}
                        title="Hướng dẫn viên mới"
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
