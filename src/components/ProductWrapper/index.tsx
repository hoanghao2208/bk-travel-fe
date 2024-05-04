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
import { FC, memo, useCallback, useState } from 'react';
import { getCustomerId } from 'reducers/token/function';
import userService from 'services/userService';
import './styles.scss';

interface ProductWrapperProps {
    tourId: number;
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
        adultQuantity,
        childQuantity,
        totalPrice,
        reload,
        selectedTour,
        setReload,
        setSelectedTour,
    }) => {
        const userId = getCustomerId();

        const [openDeleteModal, setOpenDeleteModal] = useState(false);
        const [openEditModal, setOpenEditModal] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleDeleteFromCart = useCallback(async () => {
            try {
                setLoading(true);
                const response = await userService.deleteFromCart(
                    userId,
                    tourId
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
        }, [reload, selectedTour, setReload, setSelectedTour, tourId, userId]);

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

        return (
            <>
                <div className="product-wrapper">
                    <div className="product-wrapper__content">
                        <ProductItem
                            tourId={tourId}
                            adultQuantity={adultQuantity}
                            childQuantity={childQuantity}
                        />
                    </div>
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
                    />
                    <EditPassengerNumber
                        title="Trẻ em"
                        number={childQuantity}
                        tourId={tourId}
                        reload={reload}
                        setReload={setReload}
                        isChild={true}
                    />
                </Modal>
            </>
        );
    }
);

ProductWrapper.displayName = 'Product Wrapper';

export default ProductWrapper;
