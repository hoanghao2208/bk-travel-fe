import { CompassFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import HeartIcon from 'assets/icons/HeartIcon';
import HeartRedIcon from 'assets/icons/HeartRedIcon';
import Message from 'components/Message';
import ModalSelectPassenger from 'components/TourItem/components/ModalSelectPassenger';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { useUserProfile } from 'reducers/profile/function';
import { getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import orderService from 'services/orderService';
import userService from 'services/userService';
import { IPassengerNumber } from 'utils/type';
import './styles.scss';

interface TourItemProps {
    haveBtn: boolean;
    bgItem: boolean;
    tourId: number;
    imgURL: string;
    departureTime: string;
    time: string;
    tourName: string;
    departurePlace: string;
    empty: number;
    deadlineBookTime: string;
    price: number;
}

const TourItem: FC<TourItemProps> = memo(
    ({
        haveBtn,
        bgItem,
        tourId,
        imgURL,
        departureTime,
        time,
        tourName,
        departurePlace,
        empty,
        deadlineBookTime,
        price,
    }) => {
        const userInfor = useUserProfile();
        const token = getToken();
        const userId = getCustomerId();
        const navigate = useNavigate();

        const [loveList, setLoveList] = useState<number[]>([]);
        const [selectedItem, setSelectedItem] = useState<number | null>(null);
        const [openAddModal, setOpenAddModal] = useState(false);
        const [openOrderModal, setOpenOrderModal] = useState(false);

        const [adultQuantity, setAdultQuantity] = useState<IPassengerNumber>({
            value: 1,
        });
        const [childQuantity, setChildQuantity] = useState<IPassengerNumber>({
            value: 0,
        });

        const handleNavigate = () => {
            navigate(
                generatePath(routeConstants.DETAIL_TOUR, { tour_id: tourId })
            );
        };

        const handleOpenAddModal = useCallback((tourId: number) => {
            setSelectedItem(tourId);
            setOpenAddModal(true);
        }, []);

        const handleOpenOrderModal = useCallback((tourId: number) => {
            setSelectedItem(tourId);
            setOpenOrderModal(true);
        }, []);

        const handleGetWishListTours = useCallback(async () => {
            try {
                if (userId === 0) {
                    return;
                }
                const response = await userService.getWishList(userId, token);
                if (response?.status === 200) {
                    const tempLoveList = response.data.data[0].tours.map(
                        (item: any) => item.tour_id
                    );
                    setLoveList(tempLoveList);
                }
            } catch (error) {
                console.error(error);
            }
        }, [token, userId]);

        const handleWishListTour = useCallback(async () => {
            if (token === '') {
                navigate(routeConstants.LOGIN);
                Message.sendWarning(
                    'Vui lòng đăng nhập để thực hiện chức năng này'
                );
                return;
            } else {
                if (!loveList.includes(tourId)) {
                    const response = await userService.addToWishList(
                        userId,
                        tourId,
                        token
                    );
                    if (response?.status === 201) {
                        setLoveList(prev => [...prev, tourId]);
                    }
                } else {
                    const response = await userService.removeFromWishList(
                        userId,
                        tourId,
                        token
                    );
                    if (response?.status === 200) {
                        setLoveList(prev => prev.filter(id => id !== tourId));
                    }
                }
            }
        }, [loveList, navigate, token, tourId, userId]);

        const handleAddToCart = useCallback(async () => {
            try {
                if (token === '') {
                    navigate(routeConstants.LOGIN);
                    Message.sendWarning(
                        'Vui lòng đăng nhập để thực hiện chức năng này'
                    );
                    return;
                }
                const body = {
                    user_id: userId,
                    tour: {
                        tour_id: selectedItem,
                        adult_quantity: adultQuantity.value,
                        child_quantity: childQuantity.value,
                    },
                };
                const response = await userService.addToCart(token, body);
                if (response?.status === 200) {
                    Message.sendSuccess('Thêm vào giỏ hàng thành công');
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Thêm vào giỏ hàng không thành công');
            } finally {
                setAdultQuantity(prev => ({
                    ...prev,
                    value: 1,
                }));
                setChildQuantity(prev => ({
                    ...prev,
                    value: 0,
                }));
                setOpenAddModal(false);
            }
        }, [
            adultQuantity.value,
            childQuantity.value,
            navigate,
            selectedItem,
            token,
            userId,
        ]);

        const handleCreateOrder = useCallback(async () => {
            try {
                if (token === '') {
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
                    tour_id: selectedItem,
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
                        `${routeConstants.FILL_INFORMATION}?tourId=${selectedItem}&orderId=${response.data.order.order_id}`
                    );
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Thêm vào giỏ hàng không thành công');
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
            selectedItem,
            token,
            userId,
            userInfor,
        ]);

        useEffect(() => {
            handleGetWishListTours();
        }, [handleGetWishListTours]);

        return (
            <>
                <div
                    className="tour-item"
                    style={{ backgroundColor: bgItem ? 'white' : '#f5f5f5' }}
                >
                    <div className="tour-item__header">
                        <div
                            className="tour-item__header--icon"
                            onClick={handleWishListTour}
                        >
                            {!loveList.includes(tourId) ? (
                                <HeartIcon />
                            ) : (
                                <HeartRedIcon />
                            )}
                        </div>
                        <img
                            src={imgURL}
                            alt="tour location"
                            className="tour-item__header--img"
                            onClick={handleNavigate}
                        />
                    </div>
                    <div className="tour-item__center" onClick={handleNavigate}>
                        <div className="tour-item__center--date">
                            Ngày {departureTime} - {time}
                        </div>
                        <div className="tour-item__center--location">
                            <Tooltip title={tourName}>
                                <Link to="/">{tourName}</Link>
                            </Tooltip>
                        </div>
                        <div className="tour-item__center--start">
                            <span>Nơi khởi hành:</span>
                            <span className="tour-item__center--data">
                                {departurePlace}
                            </span>
                        </div>
                        <div className="tour-item__center--blank">
                            <span>Số chổ trống:</span>
                            <span className="tour-item__center--data">
                                {empty}
                            </span>
                        </div>
                        <div className="tour-item__center--expire">
                            <span>Hạn đặt chổ:</span>
                            <span className="tour-item__center--data">
                                {deadlineBookTime}
                            </span>
                        </div>
                        <div className="tour-item__center--price">
                            <span>{price.toLocaleString()}</span>
                            <span> VNĐ</span>
                        </div>
                    </div>

                    {haveBtn && (
                        <div className="tour-item__bottom">
                            <Button
                                type="default"
                                shape="round"
                                size="large"
                                onClick={() => handleOpenAddModal(tourId)}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<CompassFilled />}
                                size="large"
                                onClick={() => handleOpenOrderModal(tourId)}
                            >
                                Đặt tour ngay
                            </Button>
                        </div>
                    )}
                </div>
                <ModalSelectPassenger
                    tourId={tourId}
                    name="count-passenger"
                    adultQuantity={adultQuantity}
                    childQuantity={childQuantity}
                    setAdultQuantity={setAdultQuantity}
                    setChildQuantity={setChildQuantity}
                    openModal={openAddModal}
                    setOpenModal={setOpenAddModal}
                    handleFinish={handleAddToCart}
                />
                <ModalSelectPassenger
                    tourId={tourId}
                    name="order-passenger"
                    adultQuantity={adultQuantity}
                    childQuantity={childQuantity}
                    setAdultQuantity={setAdultQuantity}
                    setChildQuantity={setChildQuantity}
                    openModal={openOrderModal}
                    setOpenModal={setOpenOrderModal}
                    handleFinish={handleCreateOrder}
                />
            </>
        );
    }
);

TourItem.displayName = 'Tour Item';

export default TourItem;
