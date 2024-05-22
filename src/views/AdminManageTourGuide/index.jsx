import { Form } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useEffect, useState } from 'react';
import { getToken } from 'reducers/token/function';
import tourGuideService from 'services/tourGuideService';
import Inner from 'views/AdminManageTourGuide/Inner';

const Wrapper = memo(() => {
    const token = getToken();
    const [modalTourguide, setModalTourguide] = useState(false);
    const [tourguideData, setTourguideData] = useState([]);

    const [form] = Form.useForm();

    const handleCreateTourguide = useCallback(
        async values => {
            try {
                const response = await tourGuideService.createTourguide(
                    values,
                    token
                );
                if (response?.status === 201) {
                    Message.sendSuccess('Tạo mới Hướng dẫn viên thành công');
                    form.resetFields();
                    setModalTourguide(false);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [form, token]
    );

    const handleGetAllTourguide = useCallback(async () => {
        try {
            const response = await tourGuideService.getAllTourGuides(token);
            if (response?.status === 200) {
                setTourguideData(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        handleGetAllTourguide();
    }, [handleGetAllTourguide]);

    return (
        <Inner
            form={form}
            tourguideData={tourguideData}
            modalTourguide={modalTourguide}
            setModalTourguide={setModalTourguide}
            handleCreateTourguide={handleCreateTourguide}
        />
    );
});

Wrapper.displayName = 'Admin Manage Tour Guide';

const AdminManageTourGuide = Wrapper;

export default AdminManageTourGuide;
