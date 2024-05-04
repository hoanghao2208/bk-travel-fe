import Message from 'components/Message';
import { jwtDecode } from 'jwt-decode';
import { memo, useCallback, useEffect, useState } from 'react';
import {
    getCustomerId,
    getToken,
    setCustomerId,
} from 'reducers/token/function';
import userService from 'services/userService';
import Inner from './Inner';

const Wrapper = memo(() => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const token = getToken();
    const handleGetUserData = useCallback(async () => {
        if (token) {
            const json = jwtDecode(token);
            setCustomerId(json.user_id);
            try {
                const response = await userService.getUserInfo(json.user_id);
                if (response?.status === 200) {
                    setUserInfo(response?.data.user_info);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }, [token]);

    useEffect(() => {
        handleGetUserData();
    }, [handleGetUserData]);

    const handleUpdateUserInfo = useCallback(
        async values => {
            try {
                setLoading(true);
                const user_id = getCustomerId();

                const response = await userService.updateUserInfo(
                    user_id,
                    values,
                    token
                );
                if (response?.status === 200) {
                    Message.sendSuccess('Cập nhật thông tin thành công!');
                    setDisabled(true);
                }
            } catch (err) {
                console.error(err);
                Message.sendError('Đã có lỗi xãy ra vui lòng thử lại');
            } finally {
                setLoading(false);
                window.location.reload();
            }
        },
        [token]
    );

    return (
        <Inner
            userInfo={userInfo}
            handleUpdateUserInfo={handleUpdateUserInfo}
            loading={loading}
            disabled={disabled}
            setDisabled={setDisabled}
        />
    );
});

Wrapper.displayName = 'User Profile';

const UserProfile = Wrapper;

export default UserProfile;
