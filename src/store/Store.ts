import { configureStore } from '@reduxjs/toolkit';
import * as storage from 'localforage';
import reducers from 'reducers';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { StoreState } from 'store/type';
// import middleware from 'store/middleware';

export const appReducer = combineReducers(reducers);

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['setting', 'token'],
};

const persistedReducers = persistReducer<StoreState>(persistConfig, appReducer);
const store = configureStore({
    reducer: persistedReducers,
    middleware: getDefaultMiddware => {
        return getDefaultMiddware({
            // serializableCheck: {
            //    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // }
            serializableCheck: false,
        });
    },
});

store.subscribe(() => {
    // eslint-disable-next-line no-console
    console.log('STORE', store.getState());
});

const getState = () => {
    return store.getState();
};

export default store;

export const persistor = persistStore(store);

export const dispatch = store.dispatch;

export const storeFunc = {
    getState,
    dispatch: (type: any, payload: any) => {
        store.dispatch({
            type,
            payload,
        });
    },
};
