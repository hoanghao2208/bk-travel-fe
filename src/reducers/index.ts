import commonReducer from 'reducers/common';
import errorReducer from 'reducers/error';
import profileReducer from 'reducers/profile';
import settingReducer from 'reducers/setting';
import tokenReducer from 'reducers/token';

const reducers = {
    common: commonReducer,
    error: errorReducer,
    profile: profileReducer,
    setting: settingReducer,
    token: tokenReducer,
};

export default reducers;
