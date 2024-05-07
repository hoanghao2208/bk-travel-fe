import Message from 'components/Message';
import { jwtDecode } from 'jwt-decode';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import Inner from 'views/Register/Inner';

const Wrapper = memo(() => {
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
