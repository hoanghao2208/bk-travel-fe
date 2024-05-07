import Message from 'components/Message';
import { jwtDecode } from 'jwt-decode';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import Inner from 'views/ForgotPassword/Inner';

const Wrapper = memo(() => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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

    const handleForgotPassword = useCallback(
        async value => {
            try {
                setLoading(true);
                const response = await userService.forgotPassword(value);
                if (response?.status === 200) {
                    Message.sendSuccess('Vui lòng kiểm tra email của bạn');
                    navigate(routeConstants.RESET_PASSWORD);
                }
            } catch (err) {
                console.error(err);
                Message.sendError(
                    'Tài khoản của bạn không tồn tại trên hệ thống, vui lòng kiểm tra lại'
                );
            } finally {
                setLoading(false);
            }
        },
        [navigate]
    );

    return (
        <Inner loading={loading} handleForgotPassword={handleForgotPassword} />
    );
});

Wrapper.displayName = 'Forgot Password';

const ForgotPassword = Wrapper;

export default ForgotPassword;
