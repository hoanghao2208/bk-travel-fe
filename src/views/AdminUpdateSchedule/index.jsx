import { Form } from 'antd';
import Message from 'components/Message';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import messageService from 'services/messageService';
import tourService from 'services/tourService';
import Inner from 'views/AdminUpdateSchedule/Inner';

const Wrapper = memo(() => {
    const token = getToken();
    const { tour_id } = useParams();
    const navigate = useNavigate();

    const [tourData, setTourData] = useState({});
    const [scheduleData, setScheduleData] = useState([]);
    const [scheduleId, setScheduleId] = useState(undefined);
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

    const handleGetScheduleData = useCallback(async () => {
        try {
            const response = await tourService.getTourSchedule(tour_id);
            if (response?.status === 200) {
                setScheduleData(response.data.schedule_tour.schedule_detail);
                setScheduleId(response.data.schedule_tour.id);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleUpdateScheduleTour = useCallback(
        async scheduleData => {
            try {
                setLoading(true);
                const body = {
                    tour_id,
                    name: `Nhóm hỗ trợ ${
                        tourData.name
                    } - Khởi hành ngày ${dayjs(tourData.departure_date).format(
                        'DD/MM/YYYY'
                    )} - ${tourData.time}`,
                };
                const response1 = await tourService.updateSchedule(
                    scheduleId,
                    scheduleData,
                    token
                );
                const response2 = await messageService.createGroup(token, body);

                if (response1?.status === 200 && response2?.status === 201) {
                    Message.sendSuccess('Cập nhật lịch trình thành công');
                    form.resetFields();
                    navigate(routeConstants.ADMIN_MANAGE_TOURS);
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Đã có lỗi xãy ra, vui lòng thử lại');
            } finally {
                setLoading(false);
            }
        },
        [form, navigate, scheduleId, token, tourData, tour_id]
    );

    useEffect(() => {
        handleGetTourDetails();
    }, [handleGetTourDetails]);

    useEffect(() => {
        handleGetScheduleData();
    }, [handleGetScheduleData]);

    return (
        <Inner
            form={form}
            tourData={tourData}
            scheduleData={scheduleData}
            column={column}
            handleUpdateScheduleTour={handleUpdateScheduleTour}
            loading={loading}
        />
    );
});

Wrapper.displayName = 'Admin Update Schedule';

const AdminSchedule = Wrapper;

export default AdminSchedule;
