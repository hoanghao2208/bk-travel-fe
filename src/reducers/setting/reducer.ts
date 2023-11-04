import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';
import { SettingState } from 'reducers/setting/type';

const initialState: SettingState = {};

interface SettingCaseReducer<P>
    extends CaseReducer<SettingState, PayloadAction<P>> {}

const SET_SETTING: SettingCaseReducer<{
    key: string;
    value: boolean | string | number;
}> = (state, { payload }) => {
    const { key, value } = payload;
    return _set(state, key, value);
};

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        SET_SETTING,
    },
});

export default settingSlice;
