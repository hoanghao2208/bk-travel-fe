import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenState } from 'reducers/token/type';

const initialState: TokenState = {
    accessToken: '',
    facebookAccessToken: '',
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
};

interface TokenCaseReducer<P>
    extends CaseReducer<TokenState, PayloadAction<P>> {}

const SET_ACCESS_TOKEN: TokenCaseReducer<string | undefined> = (
    state,
    { payload }
) => {
    return {
        ...state,
        accessToken: payload ?? '',
    };
};

const SET_FACEBOOK_ACCESS_TOKEN: TokenCaseReducer<{
    facebookAccessToken: string;
    userId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}> = (
    state,
    { payload: { facebookAccessToken, userId, firstName, lastName, email } }
) => {
    return {
        ...state,
        facebookAccessToken: facebookAccessToken || '',
        userId: userId ?? '',
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        email: email ?? '',
    };
};

const SET_FACE_BOOK_USER_INFO: TokenCaseReducer<{
    key: 'email' | 'firstName' | 'lastName';
    value: string;
}> = (state, { payload: { key, value } }) => {
    return {
        ...state,
        [key]: value,
    };
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        SET_ACCESS_TOKEN,
        SET_FACEBOOK_ACCESS_TOKEN,
        SET_FACE_BOOK_USER_INFO,
    },
});

export default tokenSlice;
