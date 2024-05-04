import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenState } from 'reducers/token/type';

const initialState: TokenState = {
    accessToken: '',
    user_id: 0,
    cartCount: 0,
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

const SET_USER_ID: TokenCaseReducer<number | undefined> = (
    state,
    { payload }
) => {
    return {
        ...state,
        user_id: payload ?? 0,
    };
};

const SET_CART_COUNT: TokenCaseReducer<number | undefined> = (
    state,
    { payload }
) => {
    return {
        ...state,
        cartCount: payload ?? 0,
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
        SET_CART_COUNT,
        SET_FACEBOOK_ACCESS_TOKEN,
        SET_FACE_BOOK_USER_INFO,
        SET_USER_ID,
    },
});

export default tokenSlice;
