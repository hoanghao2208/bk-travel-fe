import { dispatch } from 'store/Store';
import { errorActions } from '.';

export const setError = (code: number, message: string = '') => {
    dispatch(errorActions.SET_ERROR({ code, message }));
};
