import { Button, InputNumber } from 'antd';
import { FC, memo, useCallback, useMemo } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import userService from 'services/userService';
import './style.scss';

interface EditPassengerNumberProps {
    title: string;
    number: number;
    tourId: number;
    reload: boolean;
    setReload: (isReload: boolean) => void;
    isChild?: boolean;
    disabledIncrease: boolean;
}

const EditPassengerNumber: FC<EditPassengerNumberProps> = memo(
    ({
        title,
        number,
        tourId,
        reload,
        setReload,
        isChild,
        disabledIncrease,
    }) => {
        const userId = getCustomerId();
        const token = getToken();
        const body = useMemo(() => {
            return {
                user_id: userId,
                tour_id: tourId,
            };
        }, [tourId, userId]);

        const handleDecrementAdult = useCallback(async () => {
            try {
                await userService.decreaseAdultQuantity(token, body);
            } catch (error) {
                console.error(error);
            } finally {
                setReload(!reload);
            }
        }, [body, reload, setReload, token]);

        const handleIncrementAdult = useCallback(async () => {
            try {
                await userService.increaseAdultQuantity(token, body);
            } catch (error) {
                console.error(error);
            } finally {
                setReload(!reload);
            }
        }, [body, reload, setReload, token]);

        const handleDecrementChild = useCallback(async () => {
            try {
                await userService.decreaseChildQuantity(token, body);
            } catch (error) {
                console.error(error);
            } finally {
                setReload(!reload);
            }
        }, [body, reload, setReload, token]);

        const handleIncrementChild = useCallback(async () => {
            try {
                await userService.increaseChildQuantity(token, body);
            } catch (error) {
                console.error(error);
            } finally {
                setReload(!reload);
            }
        }, [body, reload, setReload, token]);

        return (
            <div className="edit-passenger">
                <div className="edit-passenger--wrapper">
                    <span className="edit-passenger--label">{title}</span>
                    <div className="edit-passenger--item">
                        <div className="btn-decrease">
                            <Button
                                onClick={
                                    isChild
                                        ? handleDecrementChild
                                        : handleDecrementAdult
                                }
                                disabled={isChild ? number === 0 : number === 1}
                            >
                                -
                            </Button>
                        </div>
                        <div>
                            <InputNumber value={number} />
                        </div>
                        <div className="btn-increase">
                            <Button
                                onClick={
                                    isChild
                                        ? handleIncrementChild
                                        : handleIncrementAdult
                                }
                                disabled={disabledIncrease}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

EditPassengerNumber.displayName = 'Edit Passenger Number';

export default EditPassengerNumber;
