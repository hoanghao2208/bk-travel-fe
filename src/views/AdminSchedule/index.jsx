import { memo, useCallback, useEffect, useState } from 'react';
import Inner from 'views/AdminSchedule/Inner';
import tourService from 'services/tourService';
import { useParams, useNavigate } from 'react-router-dom';
import Message from 'components/Message';
import routeConstants from 'route/routeConstant';
import { Form } from 'antd';

const Wrapper = memo(() => {
    const { tour_id } = useParams();
    const navigate = useNavigate();

    const [tourData, setTourData] = useState({});
    const [column, setColumn] = useState(0);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const handleGetTourDetails = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourData(response.data.data);
                const timeString = response.data.data.time;
                const columnNumber = parseInt(timeString.match(/\d+/)[0]);
                setColumn(columnNumber);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleScheduleTour = useCallback(
        async scheduleData => {
            try {
                setLoading(true);
                const response = await tourService.createSchedule(scheduleData);
                if (response?.status === 201) {
                    Message.sendSuccess('Khởi tạo lịch trình thành công');
                    form.resetFields();
                    navigate(routeConstants.ADMIN_MANAGE_TOURS);
                } else if (response?.status === 400) {
                    Message.sendError('Tour này đã được lên lịch trình');
                } else {
                    Message.sendError('Đã có lỗi xãy ra, vui lòng thử lại');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [form, navigate]
    );

    useEffect(() => {
        handleGetTourDetails();
    }, [handleGetTourDetails]);

    return (
        <Inner
            form={form}
            tourData={tourData}
            column={column}
            handleScheduleTour={handleScheduleTour}
            loading={loading}
        />
    );
});

Wrapper.displayName = 'Admin Schedule';

const AdminSchedule = Wrapper;

export default AdminSchedule;
