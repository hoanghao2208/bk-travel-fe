import { Form } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useState } from 'react';
import { getToken } from 'reducers/token/function';
import tourGuideService from 'services/tourGuideService';
import Inner from 'views/AdminManageTourGuide/Inner';

const Wrapper = memo(() => {
    const token = getToken();
    const [modalTourguide, setModalTourguide] = useState(false);
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

    return (
        <Inner
            form={form}
            modalTourguide={modalTourguide}
            setModalTourguide={setModalTourguide}
            handleCreateTourguide={handleCreateTourguide}
        />
    );
});

Wrapper.displayName = 'Admin Manage Tour Guide';

const AdminManageTourGuide = Wrapper;

export default AdminManageTourGuide;
