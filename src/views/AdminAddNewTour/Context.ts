import { createContext, useContext } from 'react';

interface IContext {
    loading: boolean;
    fileList: string[];
    setFileList: (value: string[]) => void;
    tourImageList: string[];
    setTourImageList: (value: string[]) => void;
    imgURL: string;
    setImgURL: (value: string) => void;
    showUpload: boolean;
    setShowUpload: (value: boolean) => void;
}

const defaultValue: IContext = {
    loading: false,
    fileList: [],
    setFileList: () => {},
    tourImageList: [],
    setTourImageList: () => {},
    imgURL: '',
    setImgURL: () => {},
    showUpload: false,
    setShowUpload: () => {},
};

const CreateTourContext = createContext<IContext>(defaultValue);

export const useCreateContext = () => useContext(CreateTourContext);

const CreateTourContextProvider = CreateTourContext.Provider;

export default CreateTourContextProvider;
