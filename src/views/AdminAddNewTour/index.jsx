import { memo, useCallback, useRef, useState } from 'react';
import Inner from 'views/AdminAddNewTour/Inner';
import tourService from 'services/tourService';
import Message from 'components/Message';
import { Form } from 'antd';

const Wrapper = memo(() => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imgURL, setImgURL] = useState('');
    const [showUpload, setShowUpload] = useState(true);

    const formRef = useRef(null);
    const [form] = Form.useForm();

    const handleCreateNewTour = useCallback(
        async data => {
            const attractions = data.attractions.map((attraction, index) => ({
                [`attractions[${index}][name]`]: attraction,
            }));

            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key !== 'attractions') {
                    formData.append(key, value);
                }
            });

            attractions.forEach(attraction => {
                Object.entries(attraction).forEach(([key, value]) => {
                    formData.append(key, value);
                });
            });

            try {
                setLoading(true);
                window.scrollTo(0, 0);
                const response = await tourService.createTour(formData);
                if (response.status === 200) {
                    Message.sendSuccess('Tạo tour mới thành công!');
                    setFileList([]);
                    setImgURL('');
                    setShowUpload(true);
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
        <Inner
            handleCreateNewTour={handleCreateNewTour}
            formRef={formRef}
            form={form}
            loading={loading}
            fileList={fileList}
            setFileList={setFileList}
            imgURL={imgURL}
            setImgURL={setImgURL}
            showUpload={showUpload}
            setShowUpload={setShowUpload}
        />
    );
});

Wrapper.displayName = 'Admin Add New Tour';

const AdminAddNewTour = Wrapper;

export default AdminAddNewTour;
