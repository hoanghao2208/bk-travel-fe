import { createContext, useContext } from 'react';

interface IContext {
    loading: boolean;
    fileList: string[];
    setFileList: (value: string[]) => void;
    imgURL: string;
    setImgURL: (value: string) => void;
    showUpload: boolean;
    setShowUpload: (value: boolean) => void;
    departureDate: string;
    setDepartureDate: (value: string) => void;
    departureTime: string;
    setDepartureTime: (value: string) => void;
    deadlineDate: string;
    setDeadlineDate: (value: string) => void;
}

const defaultValue: IContext = {
    loading: false,
    fileList: [],
    setFileList: () => {},
    imgURL: '',
    setImgURL: () => {},
    showUpload: false,
    setShowUpload: () => {},
    departureDate: '',
    setDepartureDate: () => {},
    departureTime: '',
    setDepartureTime: () => {},
    deadlineDate: '',
    setDeadlineDate: () => {},
};

const EditTourContext = createContext<IContext>(defaultValue);

export const useEditTourContext = () => useContext(EditTourContext);

const EditTourContextProvider = EditTourContext.Provider;

export default EditTourContextProvider;
