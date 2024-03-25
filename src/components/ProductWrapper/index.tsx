import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
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
    setReload: (isReload: boolean) => void;
}

const ProductWrapper: FC<ProductWrapperProps> = memo(
    ({
        tourId,
        adultQuantity,
        childQuantity,
        totalPrice,
        reload,
        setReload,
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
                }
            } catch (error) {
                console.error(error);
            } finally {
                setOpenDeleteModal(false);
                setLoading(false);
            }
        }, [reload, setReload, tourId, userId]);

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
                                type="primary"
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
                    footer={[
                        <div
                            key="submit-edit-passenger"
                            className="btn-edit-passenger"
                        >
                            <Button
                                key="submit"
                                type="primary"
                                icon={<CheckOutlined />}
                                loading={loading}
                                onClick={() => setOpenEditModal(false)}
                            >
                                Hoàn tất
                            </Button>
                            ,
                        </div>,
                    ]}
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
