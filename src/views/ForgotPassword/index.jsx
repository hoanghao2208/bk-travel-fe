import { memo, useCallback, useState } from 'react';
import Inner from 'views/ForgotPassword/Inner';
import userService from 'services/userService';
import Message from 'components/Message';
import { useNavigate } from 'react-router-dom';

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
                    navigate('/reset-password');
                } else {
                    Message.sendError(
                        'Tài khoản của bạn không tồn tại trên hệ thống, vui lòng kiểm tra lại'
                    );
                }
            } catch (err) {
                console.error(err);
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
