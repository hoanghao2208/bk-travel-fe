import { createContext, useContext } from 'react';

interface IContext {
    openOrderModal: boolean;
    setOpenOrderModal: (value: boolean) => void;
    adultQuantity: { value: number };
    setAdultQuantity: (value: { value: number }) => void;
    childQuantity: { value: number };
    setChildQuantity: (value: { value: number }) => void;
}

const defaultValue: IContext = {
    openOrderModal: false,
    setOpenOrderModal: () => {},
    adultQuantity: { value: 1 },
    setAdultQuantity: () => {},
    childQuantity: { value: 0 },
    setChildQuantity: () => {},
};

const CreateScheduleContext = createContext<IContext>(defaultValue);

export const useCreateContext = () => useContext(CreateScheduleContext);

const CreateScheduleContextProvider = CreateScheduleContext.Provider;

export default CreateScheduleContextProvider;
