import Message from 'components/Message';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import Inner from 'views/Register/Inner';

const Wrapper = memo(() => {
    const navigate = useNavigate();
    const handleRegister = useCallback(
        async data => {
            try {
                const {
                    firstname,
                    lastname,
                    email,
                    password,
                    confirm_password,
                } = data;
                const body = {
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    email: email.trim(),
                    password,
                    confirm_password,
                };
                const response = await userService.register(body);
                if (response?.status === 201) {
                    Message.sendSuccess(
                        'Đăng ký thành công, Vui lòng đăng nhập'
                    );
                    navigate(routeConstants.LOGIN);
                } else {
                    if (response?.data.message === 'Email is exist!') {
                        Message.sendError('Email đã tồn tại trên hệ thống');
                    } else {
                        Message.sendError('Đăng ký không thành công');
                    }
                }
            } catch (err) {
                console.error(err);
            }
        },
        [navigate]
    );

    return <Inner handleRegister={handleRegister} />;
});

Wrapper.displayName = 'Register';

const Register = Wrapper;

export default Register;
