import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Form, Modal } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { getToken } from 'reducers/token/function';
import messageService from 'services/messageService';
import tourGuideService from 'services/tourGuideService';
import tourService from 'services/tourService';
import Inner from 'views/AdminAssignTask/Inner';
import './style.scss';

const Wrapper = memo(() => {
    const token = getToken();
    const [form] = Form.useForm();
    const [tourguideData, setTourguideData] = useState([]);
    const [tourData, setTourData] = useState([]);
    const [allTourGuide, setAllTourGuide] = useState([]);
    const [listTourguide, setListTourguide] = useState([]);
    const [selectedTour, setSelectedTour] = useState(undefined);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [groupId, setGroupId] = useState(null);

    const handleGetTourguide = useCallback(async () => {
        try {
            const response = await tourGuideService.getAllTourGuides(token);
            if (response?.status === 200) {
                const data = response.data.data.map(tourguide => ({
                    label: tourguide.firstname + ' ' + tourguide.lastname,
                    value: tourguide.firstname + ' ' + tourguide.lastname,
                }));
                setAllTourGuide(response.data.data);
                setTourguideData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    const handleGetTour = useCallback(async () => {
        try {
            const response = await tourService.getOnlineTour();
            if (response?.status === 200) {
                const data = response.data.data.map(tour => ({
                    label: tour.tour_id + '. ' + tour.name,
                    value: tour.tour_id,
                }));
                setTourData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleGetAllGroups = useCallback(async () => {
        try {
            const response = await messageService.getAllGroups(token);
            if (response?.status === 200 && selectedTour) {
                const group = response.data.groups.find(
                    g => g.tour_id === selectedTour
                );
                if (group) {
                    setGroupId(group.group_id);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [selectedTour, token]);

    const listIdTourguide = useMemo(() => {
        return allTourGuide.reduce((acc, tourguide) => {
            const fullName = tourguide.firstname + ' ' + tourguide.lastname;
            acc[fullName] = tourguide.user_id;
            return acc;
        }, {});
    }, [allTourGuide]);

    const handleAssignTask = useCallback(
        async values => {
            try {
                const listTourGuides = [
                    values.person_1,
                    values.person_2,
                    values.person_3,
                ].filter(item => item !== undefined);

                setListTourguide(listTourGuides);

                const body = {
                    tour_id: values.tour,
                    number: parseInt(values.number),
                    listTourGuides: listTourGuides,
                    description: values.description,
                };
                const response = await tourGuideService.assignTask(body, token);
                if (response?.status === 200) {
                    Message.sendSuccess('Giao nhiệm vụ hoàn tất');
                    form.resetFields();
                    setModalConfirm(true);
                }
            } catch (error) {
                console.error(error);
                if (error.response.data.message === 'Validation error') {
                    Message.sendError('HDV đã được giao nhiệm vụ này trước đó');
                }
            }
        },
        [form, token]
    );

    const handleAddTourGuideToGroup = useCallback(async () => {
        try {
            const promises = listTourguide.map(async tourguide => {
                const body = {
                    user_id: listIdTourguide[tourguide],
                };
                const response = await messageService.addUserToGroup(
                    groupId,
                    body,
                    token
                );
                if (response?.status !== 200) {
                    throw new Error(`Failed to add user ${tourguide} to group`);
                }
            });

            await Promise.all(promises);
            Message.sendSuccess('Hoàn tất');
            setModalConfirm(false);
        } catch (error) {
            console.error(error);
        }
    }, [listIdTourguide, groupId, listTourguide, token]);

    useEffect(() => {
        handleGetTourguide();
    }, [handleGetTourguide]);

    useEffect(() => {
        handleGetTour();
    }, [handleGetTour]);

    useEffect(() => {
        handleGetAllGroups();
    }, [handleGetAllGroups]);

    return (
        <>
            <Inner
                form={form}
                tourguideData={tourguideData}
                tourData={tourData}
                handleAssignTask={handleAssignTask}
                setSelectedTour={setSelectedTour}
            />
            <Modal
                open={modalConfirm}
                title="Thông báo"
                onCancel={() => setModalConfirm(false)}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleAddTourGuideToGroup}
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <div className="modal--notification">
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                    <p>
                        Giao nhiệm vụ thành công, bấm Xác nhận để hoàn tất việc
                        giao nhiệm vụ
                    </p>
                </div>
            </Modal>
        </>
    );
});

Wrapper.displayName = 'Admin Assign Task';

const AdminAssignTask = Wrapper;

export default AdminAssignTask;
