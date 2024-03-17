import { Form } from 'antd';
import Message from 'components/Message';
import { jwtDecode } from 'jwt-decode';
import { memo, useCallback } from 'react';
import { getToken } from 'reducers/token/function';
import userService from 'services/userService';
import Inner from 'views/UserChangePasswordPage/Inner';

const Wrapper = memo(() => {
    const token = getToken();
    const [form] = Form.useForm();

    const handleChangePassword = useCallback(
        async values => {
            try {
                if (token) {
                    const json = jwtDecode(token);
                    const updatedPassword = {
                        ...values,
                        email: json.email,
                    };
                    const response = await userService.changePassword(
                        updatedPassword,
                        token
                    );
                    if (response?.status === 200) {
                        Message.sendSuccess('Thay đổi mật khẩu thành công');
                        form.resetFields();
                    } else if (response?.status === 400) {
                        Message.sendError(
                            'Mật khẩu cũ của bạn không chính xác',
                            4
                        );
                    } else {
                        Message.sendError(
                            'Thay đổi mật khẩu không thành công',
                            4
                        );
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        [form, token]
    );

    return <Inner form={form} handleChangePassword={handleChangePassword} />;
});

Wrapper.displayName = 'User Change Password';

const UserChangePasswordPage = Wrapper;

export default UserChangePasswordPage;
