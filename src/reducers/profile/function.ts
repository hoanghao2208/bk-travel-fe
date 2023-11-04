import { useSelector } from 'react-redux';
import { StoreState } from 'store/type';

export const useUserProfile = () => {
    return useSelector((state: StoreState) => state?.profile);
};

