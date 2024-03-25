import { Button, Form, InputNumber } from 'antd';
import { FC, memo } from 'react';
import { IPassengerNumber } from 'utils/type';
import './style.scss';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

interface InputPassengerNumberProps {
    title: string;
    number: IPassengerNumber;
    setNumber: (value: IPassengerNumber) => void;
    isChild?: boolean;
}

const InputPassengerNumber: FC<InputPassengerNumberProps> = memo(
    ({ title, number, setNumber, isChild }) => {
        const validatePrimeNumber = (
            number: number
        ): {
            validateStatus: ValidateStatus;
            errorMsg: string | null;
        } => {
            if (number >= 1) {
                return {
                    validateStatus: 'success',
                    errorMsg: null,
                };
            }
            return {
                validateStatus: 'error',
                errorMsg: 'Giá trị không phù hợp',
            };
        };

        const onNumberChange = (value: number | null) => {
            if (value !== null) {
                setNumber({
                    ...validatePrimeNumber(value),
                    value,
                });
            }
        };

        const handleDecrement = () => {
            const newValue = Math.max(number.value - 1, 0);
            const updatedNumber = {
                ...number,
                value: newValue,
                ...validatePrimeNumber(newValue),
            };
            setNumber(updatedNumber);
        };

        const handleIncrement = () => {
            const newValue = number.value + 1;
            const updatedNumber = {
                ...number,
                value: newValue,
                ...validatePrimeNumber(newValue),
            };
            setNumber(updatedNumber);
        };

        return (
            <div className="input-passenger">
                <div className="input-passenger--wrapper">
                    <span className="input-passenger--label">{title}</span>
                    <div className="input-passenger--item">
                        <div className="btn-decrease">
                            <Button
                                onClick={handleDecrement}
                                disabled={
                                    isChild
                                        ? number.value === 0
                                        : number.value === 1
                                }
                            >
                                -
                            </Button>
                        </div>
                        <Form.Item validateStatus={number.validateStatus}>
                            <InputNumber
                                min={isChild ? 0 : 1}
                                value={number.value}
                                onChange={onNumberChange}
                            />
                        </Form.Item>
                        <div className="btn-increase">
                            <Button onClick={handleIncrement}>+</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

InputPassengerNumber.displayName = 'Input Passenger Number';

export default InputPassengerNumber;
