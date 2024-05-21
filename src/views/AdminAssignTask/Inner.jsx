import { CompassFilled } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useCallback, useEffect, useState } from 'react';
import './style.scss';

const Inner = memo(({ form, tourguideData, tourData, handleAssignTask }) => {
    useEffect(() => {
        document.title = 'Giao nhiệm vụ';
    });
    const [numTourGuides, setNumTourGuides] = useState(1);
    const [firstTG, setFirstTG] = useState('');
    const [secondTG, setSecondTG] = useState('');
    const [thirdTG, setThirdTG] = useState('');

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

    const handleNumTourGuidesChange = value => {
        setNumTourGuides(value);
    };

    const onChangeFirstTourGuide = value => {
        setFirstTG(value);
    };

    const onChangeSecondTourGuide = value => {
        setSecondTG(value);
    };

    const onChangeThirdTourGuide = value => {
        setThirdTG(value);
    };

    const onSubmitAssignTask = useCallback(
        values => {
            handleAssignTask(values);
        },
        [handleAssignTask]
    );

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
                        form={form}
                        name="assign-new-task"
                        layout="vertical"
                        onFinish={onSubmitAssignTask}
                    >
                        <div className="admin-assign-task__content-inf1">
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
                                        filterOption={filterOption}
                                        filterSort={filterSort}
                                        options={tourData}
                                    />
                                </Form.Item>
                            </div>
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Số hướng dẫn viên"
                                    name="number"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn số lượng hướng dẫn viên',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Số hướng dẫn viên"
                                        onChange={handleNumTourGuidesChange}
                                    >
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Hướng dẫn viên 1"
                                    name="person_1"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn hướng dẫn viên',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Hướng dẫn viên 1"
                                        optionFilterProp="children"
                                        onChange={onChangeFirstTourGuide}
                                        filterOption={filterOption}
                                        filterSort={filterSort}
                                        options={tourguideData.filter(
                                            value =>
                                                value.value !== secondTG &&
                                                value.value !== thirdTG
                                        )}
                                    />
                                </Form.Item>
                            </div>
                            {numTourGuides >= 2 && (
                                <div className="admin-assign-task__content-inf1--item">
                                    <Form.Item
                                        label="Hướng dẫn viên 2"
                                        name="person_2"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng chọn hướng dẫn viên',
                                            },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Hướng dẫn viên 2"
                                            optionFilterProp="children"
                                            onChange={onChangeSecondTourGuide}
                                            filterOption={filterOption}
                                            filterSort={filterSort}
                                            options={tourguideData.filter(
                                                value =>
                                                    value.value !== firstTG &&
                                                    value.value !== thirdTG
                                            )}
                                        />
                                    </Form.Item>
                                </div>
                            )}
                            {numTourGuides >= 3 && (
                                <div className="admin-assign-task__content-inf1--item">
                                    <Form.Item
                                        label="Hướng dẫn viên 3"
                                        name="person_3"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng chọn hướng dẫn viên',
                                            },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Hướng dẫn viên 3"
                                            optionFilterProp="children"
                                            onChange={onChangeThirdTourGuide}
                                            filterOption={filterOption}
                                            filterSort={filterSort}
                                            options={tourguideData.filter(
                                                value =>
                                                    value.value !== firstTG &&
                                                    value.value !== secondTG
                                            )}
                                        />
                                    </Form.Item>
                                </div>
                            )}
                            <div className="admin-assign-task__content-inf1--item">
                                <Form.Item
                                    label="Mô tả công việc"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng mô tả công việc',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Mô tả công việc" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="admin-assign-task__content-btn">
                            <Button
                                type="primary"
                                shape="round"
                                htmlType="submit"
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
