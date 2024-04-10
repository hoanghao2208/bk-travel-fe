import { createContext, useContext } from 'react';

interface IContext {
    lovelist: number[];
    setLoveList: (value: number[]) => void;
    reload: boolean;
    setReload: (value: boolean) => void;
    openOrderModal: boolean;
    setOpenOrderModal: (value: boolean) => void;
    adultQuantity: { value: number };
    setAdultQuantity: (value: { value: number }) => void;
    childQuantity: { value: number };
    setChildQuantity: (value: { value: number }) => void;
}

const defaultValue: IContext = {
    lovelist: [],
    setLoveList: () => {},
    reload: false,
    setReload: () => {},
    openOrderModal: false,
    setOpenOrderModal: () => {},
    adultQuantity: { value: 1 },
    setAdultQuantity: () => {},
    childQuantity: { value: 0 },
    setChildQuantity: () => {},
};

const CreateDetailContext = createContext<IContext>(defaultValue);

export const useCreateContext = () => useContext(CreateDetailContext);

const CreateDetailContextProvider = CreateDetailContext.Provider;

export default CreateDetailContextProvider;
