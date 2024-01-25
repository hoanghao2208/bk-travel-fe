import { memo, useCallback, useState } from 'react';
import Inner from 'views/Login/Inner';
import userService from 'services/userService';
import Message from 'components/Message';
import { setToken } from 'reducers/token/function';
import { useNavigate } from 'react-router-dom';

const Wrapper = memo(() => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = useCallback(
        async data => {
            setIsLoading(true);
            const response = await userService.login(data);
            setIsLoading(false);
            if (response?.status === 200) {
                Message.sendSuccess('Đăng nhập thành công');
                setToken(response?.data.access_token);
                navigate('/');
            } else {
                if (response?.data.message === "Email doesn't exist!") {
                    Message.sendError(
                        'Tài khoản không tồn tại trên hệ thống',
                        4
                    );
                } else if (response?.data.message === 'Password is wrong!') {
                    Message.sendError('Mật khẩu không chính xác', 4);
                } else {
                    Message.sendError('Đăng nhập không thành công', 4);
                }
            }
        },
        [navigate]
    );

    return <Inner handleLogin={handleLogin} loading={isLoading} />;
});

Wrapper.displayName = 'Login';

const Login = Wrapper;

export default Login;
