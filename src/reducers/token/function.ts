import { useSelector } from 'react-redux';
import { storeFunc } from 'store/Store';
import { StoreState } from 'store/type';
import { tokenActions } from '.';

export const setToken = (token?: string) => {
    storeFunc.dispatch(tokenActions.SET_ACCESS_TOKEN, token);
};

export const setFacebookToken = (
    facebookAccessToken?: string,
    userId?: string,
    email?: string,
    firstName?: string,
    lastName?: string
) => {
    storeFunc.dispatch(tokenActions.SET_FACEBOOK_ACCESS_TOKEN, {
        facebookAccessToken,
        userId,
        email,
        firstName,
        lastName,
    });
};

export const getToken = () => {
    return storeFunc.getState()?.token?.accessToken;
};

export const getFacebookToken = () => {
    return storeFunc.getState()?.token?.facebookAccessToken;
};

export const getUserId = () => {
    return storeFunc.getState()?.token?.userId;
};

export const useToken = () => {
    return useSelector((state: StoreState) => state?.token?.accessToken);
};

export const useFacebookEmail = () => {
    return useSelector((state: StoreState) => state?.token?.email);
};

export const useFacebookFirstName = () => {
    return useSelector((state: StoreState) => state?.token?.firstName);
};

export const useFacebookLastName = () => {
    return useSelector((state: StoreState) => state?.token?.lastName);
};

export const setFacebookInfo = (
    key: 'email' | 'firstName' | 'lastName',
    value: string
) => {
    storeFunc.dispatch(tokenActions.SET_FACE_BOOK_USER_INFO, { key, value });
};
