import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IProfileState, ProfileState
} from 'reducers/profile/type';

const initialState: ProfileState = new ProfileState();

interface ProfileCaseReducer<P>
    extends CaseReducer<ProfileState, PayloadAction<P>> {}

const SET_PROFILE: ProfileCaseReducer<IProfileState> = (_s, { payload }) => {
    return new ProfileState(payload);
};

const UPDATE_PROFILE: ProfileCaseReducer<IProfileState> = (
    state,
    { payload }
) => {
    return new ProfileState({ ...state, ...payload });
};

const RESET_PROFILE: ProfileCaseReducer<undefined> = () => {
    return initialState;
};


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        SET_PROFILE,
        UPDATE_PROFILE,
        RESET_PROFILE,
    },
});

export default profileSlice;
