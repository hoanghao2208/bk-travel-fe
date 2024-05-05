import Message from 'components/Message';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserProfile } from 'reducers/profile/function';
import { getCustomerId } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import orderService from 'services/orderService';
import tourService from 'services/tourService';
import CreateScheduleContextProvider from 'views/ScheduleDetailPage/Context';
import Inner from 'views/ScheduleDetailPage/Inner';

const Wrapper = memo(() => {
    const userInfor = useUserProfile();
    const userId = getCustomerId();
    const { tour_id } = useParams();
    const navigate = useNavigate();

    const [tourData, setTourData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [adultQuantity, setAdultQuantity] = useState({
        value: 1,
    });
    const [childQuantity, setChildQuantity] = useState({
        value: 0,
    });

    const ContextValue = useMemo(() => {
        return {
            openOrderModal,
            setOpenOrderModal,
            adultQuantity,
            setAdultQuantity,
            childQuantity,
            setChildQuantity,
        };
    }, [adultQuantity, childQuantity, openOrderModal]);

    const handleGetTourData = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourData(response.data.data);
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
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleCreateOrder = useCallback(async () => {
        try {
            if (userId === 0) {
                navigate(routeConstants.LOGIN);
                Message.sendWarning(
                    'Vui lòng đăng nhập để thực hiện chức năng này'
                );
                return;
            }
            const body = {
                user_id: userId,
                adult_quantity: adultQuantity.value,
                child_quantity: childQuantity.value,
                tour_id: tour_id,
                name_customer: userInfor?.firstname + ' ' + userInfor?.lastname,
                phone_customer: userInfor?.phone_number,
                address_customer: 'TP. Hồ Chí Minh',
            };

            if (body.phone_customer === null || body.phone_customer === '') {
                navigate(routeConstants.USER_PROFILE);
                Message.sendWarning('Vui lòng cập nhật số điện thoại');
                return;
            }

            const response = await orderService.createOneOrder(body);
            if (response?.status === 200) {
                navigate(
                    `${routeConstants.FILL_INFORMATION}?tourId=${tour_id}&orderId=${response.data.order.order_id}`
                );
            }
        } catch (error) {
            console.error(error);
            Message.sendError('Đã có lỗi xãy ra vui lòng thử lại');
        } finally {
            setAdultQuantity(prev => ({
                ...prev,
                value: 1,
            }));
            setChildQuantity(prev => ({
                ...prev,
                value: 0,
            }));
            setOpenOrderModal(false);
        }
    }, [
        adultQuantity.value,
        childQuantity.value,
        navigate,
        tour_id,
        userId,
        userInfor,
    ]);

    useEffect(() => {
        handleGetTourData();
    }, [handleGetTourData]);

    useEffect(() => {
        handleGetScheduleData();
    }, [handleGetScheduleData]);

    return (
        <CreateScheduleContextProvider value={ContextValue}>
            <Inner
                tourData={tourData}
                scheduleData={scheduleData}
                handleCreateOrder={handleCreateOrder}
            />
        </CreateScheduleContextProvider>
    );
});

Wrapper.displayName = 'Schedule Detail';

const ScheduleDetailPage = Wrapper;

export default ScheduleDetailPage;
