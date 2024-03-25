import { Button, InputNumber } from 'antd';
import { FC, memo, useCallback, useMemo } from 'react';
import { getCustomerId } from 'reducers/token/function';
import userService from 'services/userService';
import './style.scss';

interface EditPassengerNumberProps {
    title: string;
    number: number;
    tourId: number;
    reload: boolean;
    setReload: (isReload: boolean) => void;
    isChild?: boolean;
}

const EditPassengerNumber: FC<EditPassengerNumberProps> = memo(
    ({ title, number, tourId, reload, setReload, isChild }) => {
        const userId = getCustomerId();
        const body = useMemo(() => {
            return {
                user_id: userId,
                tour_id: tourId,
            };
        }, [tourId, userId]);

        const handleDecrementAdult = useCallback(async () => {
            try {
                await userService.decreaseAdultQuantity(body);
            } catch (error) {
                console.error(error);
            } finally {
                setReload(!reload);
            }
        }, [body, reload, setReload]);

        const handleIncrementAdult = useCallback(async () => {
            try {
                await userService.increaseAdultQuantity(body);
            } catch (error) {
                console.error(error);
            } finally {
                setReload(!reload);
            }
        }, [body, reload, setReload]);

        const handleDecrementChild = useCallback(async () => {
            try {
                await userService.decreaseChildQuantity(body);
            } catch (error) {
                console.error(error);
            } finally {
                setReload(!reload);
            }
        }, [body, reload, setReload]);

        const handleIncrementChild = useCallback(async () => {
            try {
                await userService.increaseChildQuantity(body);
            } catch (error) {
                console.error(error);
            } finally {
                setReload(!reload);
            }
        }, [body, reload, setReload]);

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
