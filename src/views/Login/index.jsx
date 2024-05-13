import Message from 'components/Message';
import { jwtDecode } from 'jwt-decode';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setCustomerId, setToken } from 'reducers/token/function';
import userService from 'services/userService';
import Inner from 'views/Login/Inner';
import routeConstants from 'route/routeConstant';

const Wrapper = memo(() => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const token = getToken();

    useEffect(() => {
        if (token !== '') {
            const json = jwtDecode(token);
            if (json.role_user === 'customer') {
                navigate(routeConstants.USER_HOME_PAGE);
            } else {
                navigate(routeConstants.ADMIN_HOMEPAGE);
            }
        }
    }, [navigate, token]);

    const handleLogin = useCallback(
        async data => {
            try {
                setIsLoading(true);
                const response = await userService.login(data);
                if (response?.status === 200) {
                    Message.sendSuccess('Đăng nhập thành công');
                    setToken(response?.data.access_token);
                    const json = jwtDecode(response.data.access_token);
                    setCustomerId(json.user_id);
                    if (json.role_user === 'admin') {
                        navigate(routeConstants.ADMIN_HOMEPAGE);
                    } else {
                        navigate(routeConstants.USER_HOME_PAGE);
                    }
                }
            } catch (err) {
                if (err.response.data === 'Password is wrong!') {
                    Message.sendError('Mật khẩu không chính xác', 4);
                } else if (err.response.data === "Email doesn't exist!") {
                    Message.sendError(
                        'Tài khoản không tồn tại trên hệ thống',
                        4
                    );
                } else {
                    Message.sendError('Đăng nhập không thành công', 4);
                }
            } finally {
                setIsLoading(false);
            }
        },
        [navigate]
    );

    return <Inner handleLogin={handleLogin} loading={isLoading} />;
});

Wrapper.displayName = 'Login';

const Login = Wrapper;

export default Login;
