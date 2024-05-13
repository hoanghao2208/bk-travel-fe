import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Spin } from 'antd';
import Message from 'components/Message';
import dayjs from 'dayjs';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import messageService from 'services/messageService';
import ScheduleList from 'views/AdminSchedule/views/ScheduleList';
import './style.scss';

const Inner = memo(
    ({ form, tourData, column, handleScheduleTour, loading }) => {
        useEffect(() => {
            document.title = 'Lên lịch trình tour';
        });

        const token = getToken();
        const { tour_id } = useParams();
        const [openModal, setOpenModal] = useState(false);
        const [reload, setReload] = useState(false);
        const [allGrpId, setAllGrpId] = useState([]);
        const [groupName, setGroupName] = useState('');

        const getContentMessage = useCallback(e => {
            setGroupName(e.target.value);
        }, []);

        const handleGetAllGroups = useCallback(async () => {
            try {
                const response = await messageService.getAllGroups(token);
                if (response?.status === 200) {
                    const allId = response.data.groups.map(
                        group => group.tour_id
                    );
                    setAllGrpId(allId);
                }
            } catch (error) {
                console.error(error);
            }
        }, [token]);

        const handleCreateGroup = useCallback(async () => {
            try {
                if (groupName === '') {
                    Message.sendWarning('Vui lòng nhập tên nhóm hỗ trợ');
                    return;
                } else {
                    const body = {
                        tour_id,
                        name: groupName,
                    };
                    const response = await messageService.createGroup(
                        token,
                        body
                    );
                    if (response?.status === 201) {
                        Message.sendSuccess('Tạo nhóm hỗ trợ thành công');
                        setGroupName('');
                        setOpenModal(false);
                        setReload(prev => !prev);
                    }
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Đã có lỗi xãy ra, vui lòng thử lại');
            }
        }, [groupName, token, tour_id]);

        useEffect(() => {
            handleGetAllGroups();
        }, [handleGetAllGroups, reload]);

        return (
            <Spin tip="Vui lòng chờ" size="large" spinning={loading}>
                <AdminLayout>
                    <div className="admin-schedule">
                        <div className="admin-schedule__header">
                            <h1 className="admin-schedule__header--title">
                                lên lịch trình tour
                            </h1>
                            {tourData.name && (
                                <p className="admin-schedule__header--intro">
                                    {tourData.name} - Khởi hành ngày{' '}
                                    {dayjs(tourData.departure_date).format(
                                        'DD/MM/YYYY'
                                    )}{' '}
                                    - {tourData.time}
                                </p>
                            )}
                        </div>
                        {!allGrpId.includes(parseInt(tour_id)) && (
                            <div className="admin-schedule__create-chat">
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setOpenModal(true)}
                                >
                                    Tạo nhóm hỗ trợ
                                </Button>
                            </div>
                        )}
                        <div className="admin-schedule__content">
                            <ScheduleList
                                form={form}
                                tourData={tourData}
                                column={column}
                                handleScheduleTour={handleScheduleTour}
                                isCreatedGroup={allGrpId.includes(
                                    parseInt(tour_id)
                                )}
                            />
                        </div>
                    </div>
                    <Modal
                        title="Tên nhóm hỗ trợ"
                        open={openModal}
                        footer={[
                            <Button
                                key="back"
                                onClick={() => setOpenModal(false)}
                            >
                                Hủy
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                htmlType="submit"
                                onClick={handleCreateGroup}
                            >
                                Xác nhận
                            </Button>,
                        ]}
                    >
                        <Input
                            placeholder="Tên nhóm hỗ trợ"
                            value={groupName}
                            onChange={getContentMessage}
                        />
                    </Modal>
                </AdminLayout>
            </Spin>
        );
    }
);

Inner.displayName = 'Admin Schedule Inner';

export default Inner;
