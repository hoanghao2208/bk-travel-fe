import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import Message from 'components/Message';
import ProductItem from 'components/ProductItem';
import EditPassengerNumber from 'components/ProductWrapper/components/EditPassengerNumber';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { getToken } from 'reducers/token/function';
import tourService from 'services/tourService';
import userService from 'services/userService';
import { ITour } from 'utils/type';
import './styles.scss';

interface ProductWrapperProps {
    tourId: number;
    cartId: number;
    adultQuantity: number;
    childQuantity: number;
    totalPrice: string;
    reload: boolean;
    selectedTour: number[];
    setReload: (isReload: boolean) => void;
    setSelectedTour: (tourId: number[]) => void;
}

const ProductWrapper: FC<ProductWrapperProps> = memo(
    ({
        tourId,
        cartId,
        adultQuantity,
        childQuantity,
        totalPrice,
        reload,
        selectedTour,
        setReload,
        setSelectedTour,
    }) => {
        const token = getToken();

        const [openDeleteModal, setOpenDeleteModal] = useState(false);
        const [openEditModal, setOpenEditModal] = useState(false);
        const [loading, setLoading] = useState(false);
        const [isExpired, setIsExprired] = useState(false);
        const [tourInformation, setTourInformation] = useState<ITour>();

        const handleDeleteFromCart = useCallback(async () => {
            try {
                setLoading(true);
                const response = await userService.deleteFromCart(
                    cartId,
                    tourId,
                    token
                );
                if (response?.status === 200) {
                    Message.sendSuccess('Tour đã được xóa khỏi giỏ hàng');
                    setReload(!reload);
                    const updatedSelectedTour: number[] = selectedTour.filter(
                        item => item !== tourId
                    );
                    setSelectedTour(updatedSelectedTour);
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Đã có lỗi xãy ra vui lòng thử lại');
            } finally {
                setOpenDeleteModal(false);
                setLoading(false);
            }
        }, [
            cartId,
            reload,
            selectedTour,
            setReload,
            setSelectedTour,
            token,
            tourId,
        ]);

        const handleSelectedTour = useCallback(() => {
            if (selectedTour.includes(tourId)) {
                const updatedSelectedTour: number[] = selectedTour.filter(
                    item => item !== tourId
                );
                setSelectedTour(updatedSelectedTour);
            } else {
                const updatedSelectedTour: number[] = [...selectedTour, tourId];
                setSelectedTour(updatedSelectedTour);
            }
        }, [selectedTour, setSelectedTour, tourId]);

        const getTourInformation = useCallback(async () => {
            try {
                const response = await tourService.getOneTour(tourId);
                if (response?.status === 200) {
                    setTourInformation(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }, [tourId]);

        useEffect(() => {
            getTourInformation();
        }, [getTourInformation]);

        const disabledIncrease = useMemo(() => {
            if (tourInformation) {
                return (
                    adultQuantity + childQuantity ===
                    tourInformation.max_customer - tourInformation.booked_number
                );
            }
            return false;
        }, [adultQuantity, childQuantity, tourInformation]);

        return (
            <>
                <div className="product-wrapper">
                    <div className="product-wrapper__content">
                        <ProductItem
                            tourInformation={tourInformation}
                            adultQuantity={adultQuantity}
                            childQuantity={childQuantity}
                            setIsExprired={setIsExprired}
                        />
                    </div>
                    {!isExpired && (
                        <div className="product-wrapper__footer">
                            <div className="product-wrapper__footer--button">
                                <Button
                                    danger={selectedTour.includes(tourId)}
                                    type="primary"
                                    icon={
                                        selectedTour.includes(tourId) ? (
                                            <CloseOutlined />
                                        ) : (
                                            <CheckOutlined />
                                        )
                                    }
                                    onClick={handleSelectedTour}
                                >
                                    {selectedTour.includes(tourId)
                                        ? 'Hủy chọn tour'
                                        : 'Chọn tour này'}
                                </Button>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => setOpenEditModal(true)}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => setOpenDeleteModal(true)}
                                >
                                    Xóa
                                </Button>
                            </div>
                            <span className="product-wrapper__footer--price">
                                {parseInt(totalPrice).toLocaleString()} VNĐ
                            </span>
                        </div>
                    )}
                </div>
                <Modal
                    open={openDeleteModal}
                    title="Xóa tour khỏi giỏ hàng"
                    onCancel={() => setOpenDeleteModal(false)}
                    footer={[
                        <Button
                            key="back"
                            onClick={() => setOpenDeleteModal(false)}
                        >
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            danger
                            loading={loading}
                            onClick={handleDeleteFromCart}
                        >
                            Xác nhận
                        </Button>,
                    ]}
                >
                    <p>
                        Bạn có chắc chắn muốn xóa tour này ra khỏi giỏ hàng hay
                        không?
                    </p>
                </Modal>
                <Modal
                    open={openEditModal}
                    title="Chỉnh sửa số lượng hành khánh"
                    onCancel={() => setOpenEditModal(false)}
                    footer={null}
                >
                    <EditPassengerNumber
                        title="Người lớn"
                        number={adultQuantity}
                        tourId={tourId}
                        reload={reload}
                        setReload={setReload}
                        disabledIncrease={disabledIncrease}
                    />
                    <EditPassengerNumber
                        title="Trẻ em"
                        number={childQuantity}
                        tourId={tourId}
                        reload={reload}
                        setReload={setReload}
                        isChild={true}
                        disabledIncrease={disabledIncrease}
                    />
                </Modal>
            </>
        );
    }
);

ProductWrapper.displayName = 'Product Wrapper';

export default ProductWrapper;
