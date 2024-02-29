import { memo, useCallback, useEffect, useState } from 'react';
import tourService from 'services/tourService';
import Message from 'components/Message';
import { Form } from 'antd';
import Inner from 'views/AdminEditTour/Inner';
import { useParams, useNavigate } from 'react-router-dom';

const Wrapper = memo(() => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imgURL, setImgURL] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [showUpload, setShowUpload] = useState(true);
    const [tourData, setTourData] = useState([]);

    const [form] = Form.useForm();
    const { tour_id } = useParams();
    const navigate = useNavigate();

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
                    navigate('/admin/manage-tours');
                } else {
                    Message.sendError(
                        'Đã có lỗi xãy ra, vui lòng kiểm tra lại'
                    );
                }
            } catch (err) {
                console.error(err);
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
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetTourData();
    }, [handleGetTourData]);

    return (
        <Inner
            handleEditedTour={handleEditedTour}
            tourData={tourData}
            form={form}
            loading={loading}
            fileList={fileList}
            setFileList={setFileList}
            imgURL={imgURL}
            setImgURL={setImgURL}
            showUpload={showUpload}
            setShowUpload={setShowUpload}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
        />
    );
});

Wrapper.displayName = 'Admin Edit Tour';

const AdminEditTour = Wrapper;

export default AdminEditTour;
