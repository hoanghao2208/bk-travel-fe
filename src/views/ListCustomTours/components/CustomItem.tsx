import { Button } from 'antd';
import Message from 'components/Message';
import ModalSelectPassenger from 'components/TourItem/components/ModalSelectPassenger';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from 'reducers/profile/function';
import { getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import orderService from 'services/orderService';
import { IPassengerNumber } from 'utils/type';
import '../styles.scss';

interface Attraction {
    name: string;
}

interface CustomItemProps {
    tour_id: number;
    status: 'PENDING' | 'SUCCESS' | 'REJECTED';
    tourName: string;
    departure: string;
    destinations: string[];
    attractions: Attraction[];
    numberCustomer: number;
    departureTime: string;
    departureDate: string;
    price?: number;
    time: string;
    note: string;
}

const CustomItem: FC<CustomItemProps> = memo(
    ({
        tour_id,
        status,
        tourName,
        departure,
        destinations,
        attractions,
        numberCustomer,
        departureTime,
        departureDate,
        price,
        time,
        note,
    }) => {
        const userId = getCustomerId();
        const token = getToken();
        const userInfor = useUserProfile();
        const navigate = useNavigate();

        const [orderData, setOrderData] = useState([]);
        const [openOrderModal, setOpenOrderModal] = useState(false);
        const [adultQuantity, setAdultQuantity] = useState<IPassengerNumber>({
            value: 1,
        });
        const [childQuantity, setChildQuantity] = useState<IPassengerNumber>({
            value: 0,
        });

        const attractionNames = attractions.map(attraction => attraction.name);
        const nameString = attractionNames.join(', ');

        const handleCreateCustomOrder = useCallback(async () => {
            try {
                const body = {
                    user_id: userId,
                    adult_quantity: adultQuantity.value,
                    child_quantity: childQuantity.value,
                    tour_id: tour_id,
                    name_customer:
                        userInfor?.firstname + ' ' + userInfor?.lastname,
                    phone_customer: userInfor?.phone_number,
                    address_customer: 'TP. Hồ Chí Minh',
                };

                if (
                    body.phone_customer === null ||
                    body.phone_customer === ''
                ) {
                    navigate(routeConstants.USER_PROFILE);
                    Message.sendWarning('Vui lòng cập nhật số điện thoại');
                    return;
                }

                const response = await orderService.createOneOrder(body, token);
                if (response?.status === 200) {
                    navigate(
                        `${routeConstants.FILL_INFORMATION}?tourId=${tour_id}&orderId=${response.data.order.order_id}`
                    );
                }
            } catch (error) {
                console.error(error);
            }
        }, [
            adultQuantity.value,
            childQuantity.value,
            navigate,
            token,
            tour_id,
            userId,
            userInfor,
        ]);

        const handleGetCompletedTour = useCallback(async () => {
            try {
                const response = await orderService.getCompletedOrder(
                    userId,
                    token
                );
                if (response?.status === 200) {
                    const orderData: any = [];
                    const paymentData = [];
                    const orderCompleted = response?.data.complete_orders;
                    orderCompleted.forEach((item: any) => {
                        const tourId: number[] = [];
                        item.tours.forEach((tour: any) => {
                            tourId.push(tour.tour_id);
                        });
                        orderData[item.order_id] = { tour_id: tourId };
                        paymentData[item.payment_id] = { tour_id: tourId };
                    });
                    setOrderData(orderData);
                }
            } catch (error) {
                console.error(error);
            }
        }, [token, userId]);

        const isTourIdExists = useMemo(() => {
            if (tour_id) {
                for (let index = 0; index < orderData.length; index++) {
                    const item: any = orderData[index];
                    if (item !== undefined && item.tour_id.includes(tour_id)) {
                        return true;
                    }
                }
            }
            return false;
        }, [orderData, tour_id]);

        useEffect(() => {
            handleGetCompletedTour();
        }, [handleGetCompletedTour]);

        return (
            <>
                <div className="custom-item">
                    <img
                        src="/images/cover_image_df.jpg"
                        alt="cover_image"
                        className="custom-item--image"
                    />
                    <div className="custom-item--details">
                        <div className="custom-item--header">
                            <h3>{tourName}</h3>
                            {status === 'SUCCESS' && !isTourIdExists && (
                                <div className="custom-item--pay-order">
                                    <span className="custom-item--price">
                                        {price?.toLocaleString()} VNĐ
                                    </span>
                                    <Button
                                        type="primary"
                                        onClick={() => setOpenOrderModal(true)}
                                    >
                                        Thanh toán
                                    </Button>
                                </div>
                            )}
                            {status === 'SUCCESS' && isTourIdExists && (
                                <span className="custom-item--status">
                                    Đã thanh toán
                                </span>
                            )}
                        </div>
                        <div className="custom-item--row">
                            <div className="first-item">
                                <span>Điểm khởi hành: </span>
                                <span>{departure}</span>
                            </div>
                            <div className="second-item">
                                <span>Điểm đến: </span>
                                <span>{destinations}</span>
                            </div>
                            <div>
                                <span>Số du khách: </span>
                                <span>{numberCustomer}</span>
                            </div>
                        </div>
                        <div className="custom-item--row">
                            <div className="first-item">
                                <span>Thời gian: </span>
                                <span>{time}</span>
                            </div>
                            <div className="second-item">
                                <span>Khởi hành: </span>
                                <span>
                                    {departureTime} - {departureDate}
                                </span>
                            </div>
                            <div>
                                <span>
                                    {status === 'REJECTED'
                                        ? 'Lý do: '
                                        : 'Lưu ý: '}
                                </span>
                                <span>{note}</span>
                            </div>
                        </div>
                        <div className="custom-item--row">
                            <div>
                                <span>Điểm vui chơi: </span>
                                <span>{nameString}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalSelectPassenger
                    tourId={tour_id}
                    name="order-passenger"
                    adultQuantity={adultQuantity}
                    childQuantity={childQuantity}
                    setAdultQuantity={setAdultQuantity}
                    setChildQuantity={setChildQuantity}
                    openModal={openOrderModal}
                    setOpenModal={setOpenOrderModal}
                    handleFinish={handleCreateCustomOrder}
                    empty={numberCustomer}
                />
            </>
        );
    }
);

CustomItem.displayName = 'Custom Item';

export default CustomItem;
