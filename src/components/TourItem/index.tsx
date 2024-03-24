import { CompassFilled } from '@ant-design/icons';
import { Button, Form, Modal, Tooltip } from 'antd';
import HeartIcon from 'assets/icons/HeartIcon';
import HeartRedIcon from 'assets/icons/HeartRedIcon';
import Message from 'components/Message';
import InputPassengerNumber from 'components/TourItem/components/InputPassengerNumber';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
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
        const token = getToken();
        const userId = getCustomerId();
        const navigate = useNavigate();
        const [form] = Form.useForm();

        const [loveList, setLoveList] = useState<number[]>([]);
        const [selectedItem, setSelectedItem] = useState<number | null>(null);
        const [openModal, setOpenModal] = useState(false);
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

        const handleOpenModal = useCallback((tourId: number) => {
            setSelectedItem(tourId);
            setOpenModal(true);
        }, []);

        const handleGetWishListTours = useCallback(async () => {
            try {
                if (userId === 0) {
                    return;
                }
                const response = await userService.getWishList(userId);
                if (response?.status === 200) {
                    const tempLoveList = response.data.data.map(
                        (item: any) => item.tour_id
                    );
                    setLoveList(tempLoveList);
                }
            } catch (error) {
                console.error(error);
            }
        }, [userId]);

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
                        tourId
                    );
                    if (response?.status === 201) {
                        setLoveList(prev => [...prev, tourId]);
                    }
                } else {
                    const response = await userService.removeFromWishList(
                        userId,
                        tourId
                    );
                    if (response?.status === 200) {
                        setLoveList(prev => prev.filter(id => id !== tourId));
                    }
                }
            }
        }, [loveList, navigate, token, tourId, userId]);

        const handleAddToCart = useCallback(async () => {
            try {
                const body = {
                    user_id: userId,
                    tour: {
                        tour_id: selectedItem,
                        adult_quantity: adultQuantity.value,
                        child_quantity: childQuantity.value,
                    },
                };
                const response = await userService.addToCart(body);
                if (response?.status === 200) {
                    Message.sendSuccess('Thêm vào giỏ hàng thành công');
                } else {
                    Message.sendError('Thêm vào giỏ hàng không thành công');
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
                setOpenModal(false);
            }
        }, [adultQuantity.value, childQuantity.value, selectedItem, userId]);

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
                                onClick={() => handleOpenModal(tourId)}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<CompassFilled />}
                                size="large"
                            >
                                Đặt tour ngay
                            </Button>
                        </div>
                    )}
                </div>
                <Modal
                    title="Số lượng hành khách"
                    open={openModal}
                    // onOk={() => setModal2Open(false)}
                    footer={[
                        <Button key="back" onClick={() => setOpenModal(false)}>
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            form={`count-passenger-${tourId}`}
                        >
                            Xác nhận
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        id={`count-passenger-${tourId}`}
                        name="count-passenger"
                        onFinish={handleAddToCart}
                    >
                        <InputPassengerNumber
                            title="Người lớn"
                            number={adultQuantity}
                            setNumber={setAdultQuantity}
                        />
                        <InputPassengerNumber
                            title="Trẻ em"
                            number={childQuantity}
                            setNumber={setChildQuantity}
                            isChild={true}
                        />
                    </Form>
                </Modal>
            </>
        );
    }
);

TourItem.displayName = 'Tour Item';

export default TourItem;
