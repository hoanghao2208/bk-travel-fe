import { memo, useCallback, useState } from 'react';
import Inner from 'views/Login/Inner';
import userService from 'services/userService';
import Message from 'components/Message';
import { setCustomerId, setToken } from 'reducers/token/function';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Wrapper = memo(() => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
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
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                } else {
                    if (response?.data === "Email doesn't exist!") {
                        Message.sendError(
                            'Tài khoản không tồn tại trên hệ thống',
                            4
                        );
                    } else if (response?.data === 'Password is wrong!') {
                        Message.sendError('Mật khẩu không chính xác', 4);
                    } else {
                        Message.sendError('Đăng nhập không thành công', 4);
                    }
                }
            } catch (err) {
                console.error(err);
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
