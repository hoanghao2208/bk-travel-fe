import { memo, useEffect, useState } from 'react';
import UserActivityLayout from 'layouts/UserActivityLayout';
import Title from 'components/Title';
import { Form, Input, DatePicker, Button, Select } from 'antd';
import './style.scss';
import { DEFAULT_DISPLAY_DATE_FORMAT, VN_PHONE_NUMBER } from 'utils/constants';
import dayjs from 'dayjs';
import moment from 'moment';

const Inner = memo(
    ({ userInfo, handleUpdateUserInfo, loading, disabled, setDisabled }) => {
        useEffect(() => {
            document.title = 'Thông tin cá nhân';
        });
        const [form] = Form.useForm();
        const [selectedDate, setSelectedDate] = useState(userInfo?.dob);

        const onChangeDate = (_, dateString) => {
            const formattedDate = moment(dateString, 'DD/MM/YYYY').format(
                'YYYY-MM-DD'
            );
            setSelectedDate(formattedDate);
        };

        const handleSubmit = value => {
            const updatedData = {
                ...value,
                dob: selectedDate,
            };
            handleUpdateUserInfo(updatedData);
        };

        const { firstname, lastname, dob, email, phone_number, gender } =
            userInfo;
        return (
            <UserActivityLayout>
                <div className="user-profile">
                    <div className="user-profile__header">
                        <Title title="Thông tin cá nhân" />
                        <span onClick={() => setDisabled(false)}>
                            Chỉnh sửa thông tin
                        </span>
                    </div>
                    {Object.keys(userInfo).length !== 0 && (
                        <div className="user-profile__content">
                            <Form
                                form={form}
                                name="edit-user"
                                layout="vertical"
                                onFinish={handleSubmit}
                                autoComplete="off"
                            >
                                <div className="user-profile__content--item">
                                    <Form.Item
                                        label="Họ của bạn"
                                        name="firstname"
                                        initialValue={firstname}
                                    >
                                        <Input
                                            placeholder="Họ của bạn"
                                            disabled={disabled}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tên của bạn"
                                        name="lastname"
                                        initialValue={lastname}
                                    >
                                        <Input
                                            placeholder="Tên của bạn"
                                            disabled={disabled}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="user-profile__content--item">
                                    <Form.Item
                                        label="Ngày sinh của bạn"
                                        name="dob"
                                        initialValue={dob ? dayjs(dob) : null}
                                    >
                                        <DatePicker
                                            placeholder="Ngày sinh của bạn"
                                            disabled={disabled}
                                            format={DEFAULT_DISPLAY_DATE_FORMAT}
                                            onChange={onChangeDate}
                                            allowClear={false}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email của bạn"
                                        name="email"
                                        initialValue={email}
                                    >
                                        <Input
                                            placeholder="Email của bạn"
                                            disabled
                                        />
                                    </Form.Item>
                                </div>
                                <div className="user-profile__content--item">
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone_number"
                                        rules={[
                                            {
                                                pattern: VN_PHONE_NUMBER,
                                                message:
                                                    'Số điện thoại của bạn không đúng định dạng',
                                            },
                                        ]}
                                        initialValue={
                                            phone_number === null
                                                ? ''
                                                : phone_number
                                        }
                                    >
                                        <Input
                                            placeholder="Số điện thoại"
                                            disabled={disabled}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Giới tính"
                                        name="gender"
                                        initialValue={gender}
                                    >
                                        <Select
                                            placeholder="Giới tính"
                                            disabled={disabled}
                                        >
                                            <Option value="Nam">Nam</Option>
                                            <Option value="Nữ">Nữ</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                {disabled === false && (
                                    <div className="user-profile__content--btn">
                                        <Form.Item>
                                            <Button
                                                htmlType="button"
                                                danger
                                                type="primary"
                                                disabled={loading}
                                                onClick={() =>
                                                    setDisabled(true)
                                                }
                                            >
                                                Hủy
                                            </Button>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                htmlType="submit"
                                                disabled={loading}
                                                type="primary"
                                            >
                                                Thay đổi
                                            </Button>
                                        </Form.Item>
                                    </div>
                                )}
                            </Form>
                        </div>
                    )}
                </div>
            </UserActivityLayout>
        );
    }
);

Inner.displayName = 'User Profile Inner';

export default Inner;
