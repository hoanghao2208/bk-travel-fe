import Message from 'components/Message';
import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import Inner from 'views/ResetPassword/Inner';

const Wrapper = memo(() => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = useCallback(
        async value => {
            try {
                setLoading(true);
                const response = await userService.resetPassword(value);
                if (response?.status === 200) {
                    Message.sendSuccess(
                        'Cập nhật mật khẩu thành công, vui lòng đăng nhập lại'
                    );
                    navigate(routeConstants.LOGIN);
                } else {
                    if (response?.data.Message === 'Code is expired!') {
                        Message.sendError(
                            'Mã xác nhận đã hết hạn, vui lòng thử lại',
                            5
                        );
                        navigate(routeConstants.FORGOT_PASSWORD);
                    } else if (response?.data.Message === 'Code is wrong!') {
                        Message.sendError(
                            'Mã xác nhận không chính xác, vui lòng kiểm tra lại',
                            5
                        );
                    } else {
                        Message.sendError(
                            'Đổi mật khẩu không thành công, vui lòng kiểm tra lại',
                            5
                        );
                    }
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
        <Inner loading={loading} handleResetPassword={handleResetPassword} />
    );
});

Wrapper.displayName = 'Reset Password';

const ResetPassword = Wrapper;

export default ResetPassword;
