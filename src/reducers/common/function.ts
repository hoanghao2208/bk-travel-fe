import { useSelector } from 'react-redux';
import { dispatch } from 'store/Store';
import { StoreState } from 'store/type';
import { commonActions } from '.';

export const setExampleData = (value?: string) => {
    dispatch(
        commonActions.SET_EXAMPLE_DATA(value)
    );
};

export const useFullScreenDataEntry = () => {
    return useSelector(
        (state: StoreState) => state?.common?.example
    );
};
