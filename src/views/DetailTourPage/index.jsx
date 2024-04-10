import Message from 'components/Message';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserProfile } from 'reducers/profile/function';
import { getCustomerId } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import commentService from 'services/commentService';
import orderService from 'services/orderService';
import tourService from 'services/tourService';
import userService from 'services/userService';
import CreateDetailContextProvider from 'views/DetailTourPage/Context';
import Inner from 'views/DetailTourPage/Inner';

const Wrapper = memo(() => {
    const userInfor = useUserProfile();
    const { tour_id } = useParams();
    const navigate = useNavigate();
    const userId = getCustomerId();

    const [tourData, setTourData] = useState([]);
    const [loveList, setLoveList] = useState([]);
    const [commentsList, setCommentsList] = useState([]);
    const [reviewsList, setReviewsList] = useState([]);
    const [reload, setReload] = useState(false);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [adultQuantity, setAdultQuantity] = useState({
        value: 1,
    });
    const [childQuantity, setChildQuantity] = useState({
        value: 0,
    });

    const ContextValue = useMemo(() => {
        return {
            loveList,
            setLoveList,
            reload,
            setReload,
            openOrderModal,
            setOpenOrderModal,
            adultQuantity,
            setAdultQuantity,
            childQuantity,
            setChildQuantity,
        };
    }, [adultQuantity, childQuantity, loveList, openOrderModal, reload]);

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

    const handleGetWishListTours = useCallback(async () => {
        try {
            if (userId === 0) {
                return;
            }
            const response = await userService.getWishList(userId);
            if (response?.status === 200) {
                const tempLoveList = response.data.data[0].tours.map(
                    item => item.tour_id
                );
                setLoveList(tempLoveList);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    const handleGetComment = useCallback(async () => {
        try {
            const response = await commentService.getAllComments(tour_id);
            if (response?.status === 200) {
                setCommentsList(response.data.comments);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleGetReviews = useCallback(async () => {
        try {
            const response = await commentService.getAllReviews(tour_id);
            if (response?.status === 200) {
                setReviewsList(response.data.all_reviews);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleCreateOrder = useCallback(async () => {
        try {
            const body = {
                user_id: userId,
                adult_quantity: adultQuantity.value,
                child_quantity: childQuantity.value,
                tour_id: tour_id,
                name_customer: userInfor?.firstname + ' ' + userInfor?.lastname,
                phone_customer: userInfor?.phone_number,
                address_customer: 'TP. Hồ Chí Minh',
            };

            if (body.phone_customer === null) {
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
    }, [handleGetTourData, reload]);

    useEffect(() => {
        handleGetWishListTours();
    }, [handleGetWishListTours]);

    useEffect(() => {
        handleGetComment();
    }, [handleGetComment, reload]);

    useEffect(() => {
        handleGetReviews();
    }, [handleGetReviews, reload]);

    return (
        <CreateDetailContextProvider value={ContextValue}>
            <Inner
                tourData={tourData}
                commentsList={commentsList}
                reviewsList={reviewsList}
                handleCreateOrder={handleCreateOrder}
            />
        </CreateDetailContextProvider>
    );
});

Wrapper.displayName = 'Detail Tour';

const DetailTourPage = Wrapper;

export default DetailTourPage;
