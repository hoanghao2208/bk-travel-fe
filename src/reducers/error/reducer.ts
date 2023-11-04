import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState } from 'reducers/error/type';

const initialState: ErrorState = {
    message: '',
    code: 0,
};

interface ErrorCaseReducer<P>
    extends CaseReducer<ErrorState, PayloadAction<P>> {}

const SET_ERROR: ErrorCaseReducer<{ message: string; code: number }> = (
    _s,
    { payload }
) => {
    return payload;
};

const RESET_ERROR: ErrorCaseReducer<undefined> = () => {
    return initialState;
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        SET_ERROR,
        RESET_ERROR,
    },
});

export default errorSlice;
