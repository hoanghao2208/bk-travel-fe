import { FC, memo, ReactComponentElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileActions } from 'reducers/profile';
import { setToken, useToken } from 'reducers/token/function';
import { Provider } from 'route/Context';
import RouteNavigate from 'route/components/RouteNavigate';
import userService from 'services/userService';
import { dispatch } from 'store/Store';
import routeConstants from '../routeConstant';

interface IProps {
    children: ReactComponentElement<any>;
    authorization?: boolean;
    redirect?: string;
    path: string;
}

const RouteElement: FC<IProps> = memo(
    ({ children, authorization, redirect, path }) => {
        const [authorized, setAuthorized] = useState(false);
        const navigateFunc = useNavigate();
        const token = useToken();
        useEffect(() => {
            if (!authorized) {
                if (authorization) {
                    if (token) {
                        userService.me().then(res => {
                            if (res.isSuccess) {
                                setAuthorized(true);
                                dispatch(profileActions.SET_PROFILE(res.data));
                            } else {
                                setToken('');
                                setAuthorized(false);
                                navigateFunc(routeConstants.LOGIN);
                            }
                        });
                    } else {
                        setAuthorized(false);
                        navigateFunc(routeConstants.LOGIN);
                    }
                } else {
                    setAuthorized(true);
                }
            } else if (authorization && !token) {
                setAuthorized(false);
                navigateFunc(routeConstants.LOGIN);
            }
        }, [authorization, authorized, navigateFunc, token]);

        if (!authorized) {
            return null;
        }
        if (redirect) {
            return <RouteNavigate to={redirect} />;
        }
        return <Provider path={path}>{children}</Provider>;
    }
);
RouteElement.displayName = 'RouteElement';

export default RouteElement;
