import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from 'reducers/common/type';

const initialState: CommonState = {
    example: 'example',
};

interface CommonCaseReducer<P>
    extends CaseReducer<CommonState, PayloadAction<P>> {}

const SET_EXAMPLE_DATA: CommonCaseReducer<string | undefined> = (
    state,
    { payload }
) => {
    return {
        ...state,
        example: payload || 'example',
    };
};

const profileSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        SET_EXAMPLE_DATA,
    },
});

export default profileSlice;
