import { memo, useCallback, useMemo, useState } from 'react';
import Inner from 'views/AdminAddNewTour/Inner';
import tourService from 'services/tourService';
import Message from 'components/Message';
import { Form } from 'antd';
import CreateTourContextProvider from './Context';

const Wrapper = memo(() => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [tourImageList, setTourImageList] = useState([]);
    const [imgURL, setImgURL] = useState('');
    const [showUpload, setShowUpload] = useState(true);
    const [tourListURL, setTourListURL] = useState([]);

    const [form] = Form.useForm();

    const ContextValue = useMemo(() => {
        return {
            loading,
            fileList,
            setFileList,
            tourImageList,
            setTourImageList,
            tourListURL,
            setTourListURL,
            imgURL,
            setImgURL,
            showUpload,
            setShowUpload,
        };
    }, [fileList, imgURL, loading, showUpload, tourImageList, tourListURL]);

    const handleCreateNewTour = useCallback(
        async data => {
            const formData = new FormData();

            const imagesList = data.list_images.map((image, index) => ({
                [`image[${index}]`]: image,
            }));

            Object.entries(data).forEach(([key, value]) => {
                if (
                    key !== 'attractions' &&
                    key !== 'all_attractions' &&
                    key !== 'list_images'
                ) {
                    formData.append(key, value);
                }
            });

            data.all_attractions.forEach(attraction => {
                Object.entries(attraction).forEach(([key, value]) => {
                    formData.append(key, value);
                });
            });

            imagesList.forEach(img => {
                Object.entries(img).forEach(([key, value]) => {
                    formData.append(key, value);
                });
            });

            try {
                setLoading(true);
                window.scrollTo(0, 0);
                const response = await tourService.createTour(formData);
                if (response.status === 201) {
                    Message.sendSuccess('Tạo tour mới thành công!');
                    setFileList([]);
                    setImgURL('');
                    setShowUpload(true);
                    setTourImageList([]);
                    setTourListURL([]);
                    form.resetFields();
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
        [form]
    );

    return (
        <CreateTourContextProvider value={ContextValue}>
            <Inner handleCreateNewTour={handleCreateNewTour} form={form} />
        </CreateTourContextProvider>
    );
});

Wrapper.displayName = 'Admin Add New Tour';

const AdminAddNewTour = Wrapper;

export default AdminAddNewTour;
