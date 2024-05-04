import { Form } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import customTourService from 'services/customTourService';
import tourService from 'services/tourService';
import Inner from 'views/CustomTourPage/Inner';

const Wrapper = memo(() => {
    const userId = getCustomerId();
    const token = getToken();
    const [form] = Form.useForm();

    const [allDestinations, setAllDestinations] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllDestinations = useCallback(async () => {
        try {
            const response = await tourService.getAllDestinations();
            if (response.status === 200) {
                const allDes = response.data.data;
                allDes.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                setAllDestinations(allDes);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleCreateCustomTour = useCallback(
        async values => {
            try {
                setLoading(true);
                const response = await customTourService.proposeTour(
                    userId,
                    token,
                    values
                );
                if (response?.status === 200) {
                    Message.sendSuccess(
                        'Bạn đã gửi yêu cầu thành công, vui lòng chờ sự phản hồi của quản trị viên'
                    );
                    form.resetFields();
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Đã có lỗi xãy ra, vui lòng thử lại');
            } finally {
                setLoading(false);
            }
        },
        [form, token, userId]
    );

    useEffect(() => {
        getAllDestinations();
    }, [getAllDestinations]);

    return (
        <Inner
            form={form}
            allDestinations={allDestinations}
            loading={loading}
            handleCreateCustomTour={handleCreateCustomTour}
        />
    );
});

Wrapper.displayName = 'Custom Tour';

const CustomTourPage = Wrapper;

export default CustomTourPage;
