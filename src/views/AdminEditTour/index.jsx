import { Form } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import tourService from 'services/tourService';
import EditTourContextProvider from 'views/AdminEditTour/Context';
import Inner from 'views/AdminEditTour/Inner';

const Wrapper = memo(() => {
    const [imgURL, setImgURL] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');
    const [fileList, setFileList] = useState([]);
    const [tourData, setTourData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showUpload, setShowUpload] = useState(true);

    const [form] = Form.useForm();
    const { tour_id } = useParams();
    const navigate = useNavigate();

    const ContextValue = useMemo(() => {
        return {
            loading,
            fileList,
            setFileList,
            imgURL,
            setImgURL,
            showUpload,
            setShowUpload,
            departureDate,
            setDepartureDate,
            departureTime,
            setDepartureTime,
            deadlineDate,
            setDeadlineDate,
        };
    }, [
        deadlineDate,
        departureDate,
        departureTime,
        fileList,
        imgURL,
        loading,
        showUpload,
    ]);

    const handleEditedTour = useCallback(
        async data => {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key !== 'attractions' && key !== 'destination_place') {
                    formData.append(key, value);
                }
            });
            try {
                setLoading(true);
                window.scrollTo(0, 0);
                const response = await tourService.updateTour(
                    formData,
                    tour_id
                );
                if (response.status === 200) {
                    Message.sendSuccess('Cập nhật dữ liệu tour thành công!');
                    navigate(routeConstants.ADMIN_MANAGE_TOURS);
                }
            } catch (err) {
                console.error(err);
                Message.sendError('Đã có lỗi xãy ra, vui lòng kiểm tra lại');
            } finally {
                setLoading(false);
            }
        },
        [navigate, tour_id]
    );

    const handleGetTourData = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourData(response?.data.data);
                setImgURL(response?.data.data.cover_image);
                setShowUpload(false);
                setDepartureDate(response?.data.data.departure_date);
                setDepartureTime(response?.data.data.departure_time);
                setDeadlineDate(response?.data.data.deadline_book_time);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetTourData();
    }, [handleGetTourData]);

    return (
        <EditTourContextProvider value={ContextValue}>
            <Inner
                handleEditedTour={handleEditedTour}
                tourData={tourData}
                form={form}
            />
        </EditTourContextProvider>
    );
});

Wrapper.displayName = 'Admin Edit Tour';

const AdminEditTour = Wrapper;

export default AdminEditTour;
