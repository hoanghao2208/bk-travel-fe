import Message from 'components/Message';
import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import Inner from 'views/ForgotPassword/Inner';

const Wrapper = memo(() => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
