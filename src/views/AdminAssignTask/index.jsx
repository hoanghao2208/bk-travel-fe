import { Form } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useEffect, useState } from 'react';
import { getToken } from 'reducers/token/function';
import tourGuideService from 'services/tourGuideService';
import tourService from 'services/tourService';
import Inner from 'views/AdminAssignTask/Inner';

const Wrapper = memo(() => {
    const token = getToken();
    const [form] = Form.useForm();
    const [tourguideData, setTourguideData] = useState([]);
    const [tourData, setTourData] = useState([]);

    const handleGetTourguide = useCallback(async () => {
        try {
            const response = await tourGuideService.getAllTourGuides(token);
            if (response?.status === 200) {
                const data = response.data.data.map(tourguide => ({
                    label: tourguide.firstname + ' ' + tourguide.lastname,
                    value: tourguide.firstname + ' ' + tourguide.lastname,
                }));
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

    const handleAssignTask = useCallback(
        async values => {
            try {
                const body = {
                    tour_id: values.tour,
                    number: parseInt(values.number),
                    listTourGuides: [
                        values.person_1,
                        values.person_2,
                        values.person_3,
                    ].filter(item => item !== undefined),
                    description: values.description,
                };
                const response = await tourGuideService.assignTask(body, token);
                if (response?.status === 200) {
                    Message.sendSuccess('Giao nhiệm vụ hoàn tất');
                    form.resetFields();
                }
            } catch (error) {
                console.error(error);
            }
        },
        [form, token]
    );

    useEffect(() => {
        handleGetTourguide();
    }, [handleGetTourguide]);

    useEffect(() => {
        handleGetTour();
    }, [handleGetTour]);

    return (
        <Inner
            form={form}
            tourguideData={tourguideData}
            tourData={tourData}
            handleAssignTask={handleAssignTask}
        />
    );
});

Wrapper.displayName = 'Admin Assign Task';

const AdminAssignTask = Wrapper;

export default AdminAssignTask;
