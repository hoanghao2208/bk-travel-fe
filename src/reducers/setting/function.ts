import _get from 'lodash/get';
import { useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SettingKeyType } from 'reducers/setting/enums';
import { storeFunc } from 'store/Store';
import { StoreState } from 'store/type';
import { settingActions } from '.';

export const useSetting = (
    key: SettingKeyType,
    defaultValue?: boolean | string | number
): [any, (value: any) => void] => {
    const dataRef = useRef<any>(null);
    const setting = useSelector((state: StoreState) => state.setting);
    const data = useMemo(() => {
        const data = _get(setting, key, defaultValue);
        dataRef.current = data;
        return data;
    }, [setting, key, defaultValue]);

    const setData = useCallback(
        (value: boolean | string | number | Function) => {
            if (typeof value === 'function') {
                storeFunc.dispatch(settingActions.SET_SETTING, {
                    key,
                    value: value(dataRef.current),
                });
            } else {
                storeFunc.dispatch(settingActions.SET_SETTING, { key, value });
            }
        },
        [key]
    );

    return [data, setData];
};
