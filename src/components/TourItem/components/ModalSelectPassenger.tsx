import { Button, Form, Modal } from 'antd';
import InputPassengerNumber from 'components/TourItem/components/InputPassengerNumber';
import { FC, memo, useMemo } from 'react';
import { IPassengerNumber } from 'utils/type';
import '../styles.scss';

interface ModalSelectPassengerProps {
    tourId: number;
    name: string;
    adultQuantity: IPassengerNumber;
    childQuantity: IPassengerNumber;
    setAdultQuantity: (value: IPassengerNumber) => void;
    setChildQuantity: (value: IPassengerNumber) => void;
    openModal: boolean;
    setOpenModal: (isOpen: boolean) => void;
    handleFinish: () => void;
    empty: number;
}

const ModalSelectPassenger: FC<ModalSelectPassengerProps> = memo(
    ({
        tourId,
        name,
        adultQuantity,
        childQuantity,
        setAdultQuantity,
        setChildQuantity,
        openModal,
        setOpenModal,
        handleFinish,
        empty,
    }) => {
        const disabledIncrease = useMemo(() => {
            if (adultQuantity.value + childQuantity.value === empty) {
                return true;
            }
            return false;
        }, [adultQuantity.value, childQuantity.value, empty]);

        return (
            <Modal
                title="Số lượng hành khách"
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={[
                    <div key="add-to-cart-footer" className="btn-add-to-cart">
                        <Button key="back" onClick={() => setOpenModal(false)}>
                            Hủy
                        </Button>
                        ,
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            form={`${name}-${tourId}`}
                            className="btn-add-to-cart-submit"
                        >
                            Xác nhận
                        </Button>
                        ,
                    </div>,
                ]}
            >
                <Form
                    id={`${name}-${tourId}`}
                    name={name}
                    onFinish={handleFinish}
                >
                    <InputPassengerNumber
                        title="Người lớn"
                        number={adultQuantity}
                        setNumber={setAdultQuantity}
                        disabledIncrease={disabledIncrease}
                    />
                    <InputPassengerNumber
                        title="Trẻ em"
                        number={childQuantity}
                        setNumber={setChildQuantity}
                        isChild={true}
                        disabledIncrease={disabledIncrease}
                    />
                </Form>
            </Modal>
        );
    }
);

ModalSelectPassenger.displayName = 'Modal Add To Cart';

export default ModalSelectPassenger;
