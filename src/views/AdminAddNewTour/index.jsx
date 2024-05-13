import { Form } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useMemo, useState } from 'react';
import { getToken } from 'reducers/token/function';
import tourService from 'services/tourService';
import Inner from 'views/AdminAddNewTour/Inner';
import CreateTourContextProvider from './Context';

const Wrapper = memo(() => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [tourImageList, setTourImageList] = useState([]);
    const [imgURL, setImgURL] = useState('');
    const [showUpload, setShowUpload] = useState(true);
    const [fileListMap, setFileListMap] = useState(new Map());

    const [form] = Form.useForm();
    const token = getToken();

    const ContextValue = useMemo(() => {
        return {
            loading,
            fileList,
            setFileList,
            tourImageList,
            setTourImageList,
            imgURL,
            setImgURL,
            showUpload,
            setShowUpload,
        };
    }, [fileList, imgURL, loading, showUpload, tourImageList]);

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
                const response = await tourService.createTour(token, formData);
                if (response.status === 201) {
                    Message.sendSuccess('Tạo tour mới thành công!');
                    setFileList([]);
                    setImgURL('');
                    setShowUpload(true);
                    setTourImageList([]);
                    setFileListMap(new Map());
                    form.resetFields();
                }
            } catch (err) {
                console.error(err);
                Message.sendError('Đã có lỗi xãy ra, vui lòng kiểm tra lại');
            } finally {
                setLoading(false);
            }
        },
        [form, token]
    );

    return (
        <CreateTourContextProvider value={ContextValue}>
            <Inner
                handleCreateNewTour={handleCreateNewTour}
                form={form}
                fileListMap={fileListMap}
                setFileListMap={setFileListMap}
            />
        </CreateTourContextProvider>
    );
});

Wrapper.displayName = 'Admin Add New Tour';

const AdminAddNewTour = Wrapper;

export default AdminAddNewTour;
