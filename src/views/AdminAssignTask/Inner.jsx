import { CompassFilled } from '@ant-design/icons';
import { Button, DatePicker, Form, Select } from 'antd';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useEffect, useRef } from 'react';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Giao nhiệm vụ';
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
            <div className="admin-assign-task">
                <div className="admin-assign-task__header">
                    <h1 className="admin-assign-task__header--title">
                        giao nhiệm vụ
                    </h1>
                    <p className="admin-assign-task__header--intro">
                        Vui lòng điền các thông tin bên dưới để có thể hoàn tất
                        việc giao nhiệm vụ cho hướng dẫn viên của bạn.
                    </p>
                </div>
                <div className="admin-assign-task__content">
                    <Form
                        ref={formRef}
                        name="assignt-new-task"
                        layout="vertical"
                        // onFinish={onFinish}
                    >
                        <div className="admin-assign-task__content-inf1">
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Điểm khởi hành"
                                    name="departure"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn điểm khởi hành',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Điểm khởi hành">
                                        <Option value="hochiminh">
                                            TP. Hồ Chí Minh
                                        </Option>
                                        <Option value="danang">Đà Nẵng</Option>
                                        <Option value="hanoi">Hà Nội</Option>
                                        <Option value="vungtau">
                                            Vũng Tàu
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Điểm đến"
                                    name="destination"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn điểm đến',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Điểm đến">
                                        <Option value="hochiminh">
                                            TP. Hồ Chí Minh
                                        </Option>
                                        <Option value="danang">Đà Nẵng</Option>
                                        <Option value="hanoi">Hà Nội</Option>
                                        <Option value="vungtau">
                                            Vũng Tàu
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Ngày khởi hành"
                                    name="day"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn ngày khởi hành',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Ngày khởi hành"
                                        format={DEFAULT_DISPLAY_DATE_FORMAT}
                                    />
                                </Form.Item>
                            </div>
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Tour hướng dẫn"
                                    name="tour"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn tour hướng dẫn',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Tour hướng dẫn"
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
                        </div>
                        <div className="admin-assign-task__content-inf1">
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Số hướng dẫn viên"
                                    name="number-tour-guide"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn số lượng hướng dẫn viên',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Số hướng dẫn viên">
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Hướng dẫn viên 1"
                                    name="person-1"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn hướng dẫn viên',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Hướng dẫn viên 1">
                                        <Option value="ng-v-a">
                                            Nguyễn Văn A
                                        </Option>
                                        <Option value="ng-v-b">
                                            Nguyễn Văn B
                                        </Option>
                                        <Option value="ng-v-c">
                                            Nguyễn Văn C
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Hướng dẫn viên 2"
                                    name="person-2"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn hướng dẫn viên',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Hướng dẫn viên 2">
                                        <Option value="ng-v-a">
                                            Nguyễn Văn A
                                        </Option>
                                        <Option value="ng-v-b">
                                            Nguyễn Văn B
                                        </Option>
                                        <Option value="ng-v-c">
                                            Nguyễn Văn C
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Hướng dẫn viên 3"
                                    name="person-3"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn hướng dẫn viên',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Hướng dẫn viên 3">
                                        <Option value="ng-v-a">
                                            Nguyễn Văn A
                                        </Option>
                                        <Option value="ng-v-b">
                                            Nguyễn Văn B
                                        </Option>
                                        <Option value="ng-v-c">
                                            Nguyễn Văn C
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="admin-assign-task__content-btn">
                            <Button
                                type="primary"
                                shape="round"
                                icon={<CompassFilled />}
                                size="large"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Assign Task Inner';

export default Inner;
