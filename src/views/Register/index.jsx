import { memo, useCallback } from 'react';
import Inner from 'views/Register/Inner';
import userService from 'services/userService';
import Message from 'components/Message';
import { useNavigate } from 'react-router-dom';

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
                    navigate('/login');
                } else {
                    if (response?.data.message === 'Email is exist!') {
                        Message.sendError('Email đã tồn tại trên hệ thống');
                    } else {
                        Message.sendError('Đăng ký không thành công');
                    }
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        },
        [navigate]
    );

    return <Inner handleRegister={handleRegister} />;
});

Wrapper.displayName = 'Register';

const Register = Wrapper;

export default Register;
