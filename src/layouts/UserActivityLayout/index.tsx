import { CameraOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Modal, Spin, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Message from 'components/Message';
import UserActivityMenu from 'components/UserActivityMenu';
import UserFooter from 'components/UserFooter';
import UserLoginHeader from 'components/UserLoginHeader';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
    FC,
    memo,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import './styles.scss';

interface UserInfo {
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
}

const defaultUserInfo: UserInfo = {
    firstname: '',
    lastname: '',
    email: '',
    avatar: '',
};

interface DecodedToken extends JwtPayload {
    role_user: string;
}

const UserActivityLayout: FC<PropsWithChildren> = memo(({ children }) => {
    const [avtModal, setAvtModal] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentError, setCurrentError] = useState<string>('');

    const user_id = getCustomerId();
    const token = getToken();

    const json: DecodedToken = jwtDecode(token);
    const navigate = useNavigate();

    const handleCancel = () => {
        setAvtModal(false);
    };

    const handleGetUserData = useCallback(async () => {
        try {
            const response = await userService.getUserInfo(user_id);
            if (response?.status === 200) {
                setUserInfo(response?.data.user_info);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }, [user_id]);

    const handleBeforeUpload = (file: RcFile) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const isAllowedType = allowedTypes.includes(file.type);
        const maxSize = 10 * 1024 * 1024;
        const isWithinSizeLimit = file.size <= maxSize;

        if (!isAllowedType || !isWithinSizeLimit) {
            setCurrentError(
                !isAllowedType
                    ? 'Định dạng file không phù hợp'
                    : 'File vượt quá kích thước cho phép'
            );
            return false;
        }

        return true;
    };

    const handleUpload: UploadProps['onChange'] = async ({
        fileList: newFileList,
    }) => {
        if (
            newFileList &&
            newFileList.length > 0 &&
            newFileList[0].originFileObj
        ) {
            const isFileValid = handleBeforeUpload(
                newFileList[0].originFileObj
            );

            if (!isFileValid) {
                setCurrentError('');
                return;
            }

            setFileList(newFileList);
            try {
                setLoading(true);
                setAvtModal(false);

                const formData = new FormData();
                formData.append('avatar', newFileList[0].originFileObj);

                const response = await userService.uploadAvatar(
                    user_id,
                    formData,
                    token
                );

                if (response?.status === 200) {
                    Message.sendSuccess('Cập nhật ảnh đại diện thành công');
                    window.location.reload();
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            } finally {
                setLoading(false);
                setFileList([]);
                setCurrentError('');
            }
        }
    };

    useEffect(() => {
        if (currentError !== '') {
            Message.sendError(currentError, 5);
        }
    }, [currentError]);

    useEffect(() => {
        handleGetUserData();
    }, [handleGetUserData]);

    useEffect(() => {
        if (json.role_user !== 'customer') {
            navigate(routeConstants.ADMIN_HOMEPAGE);
        }
    }, [json, navigate]);

    return (
        <Spin tip="Vui lòng chờ" size="large" spinning={loading}>
            <UserLoginHeader />
            <div className="user-activity-wrapper">
                <div className="user-activity">
                    <div className="user-activity__menu">
                        {Object.keys(userInfo).length !== 0 && (
                            <div className="user-activity__menu--avt">
                                <div className="user-activity__menu--avt-wrapper">
                                    <Avatar
                                        size={116}
                                        icon={<UserOutlined />}
                                        src={
                                            userInfo?.avatar
                                                ? userInfo.avatar
                                                : null
                                        }
                                    />
                                    <div
                                        className="user-activity__menu--avt-change"
                                        onClick={() => setAvtModal(true)}
                                    >
                                        <CameraOutlined className="user-activity__menu--avt-icon" />
                                        <span>Thay đổi</span>
                                    </div>
                                </div>
                                <h3 className="user-activity__menu--name">
                                    {userInfo?.firstname +
                                        ' ' +
                                        userInfo?.lastname}
                                </h3>
                                <p className="user-activity__menu--email">
                                    {userInfo?.email}
                                </p>
                            </div>
                        )}
                        <UserActivityMenu />
                    </div>
                    <div className="user-activity__modal">
                        <Modal
                            title="Thay đổi ảnh đại diện"
                            open={avtModal}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <Upload.Dragger
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUpload}
                                beforeUpload={handleBeforeUpload}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Chọn ảnh đại diện của bạn
                                </p>
                            </Upload.Dragger>
                        </Modal>
                    </div>
                    <div className="user-activity__children">{children}</div>
                </div>
            </div>
            <UserFooter />
        </Spin>
    );
});

UserActivityLayout.displayName = 'User Activity Layout';

export default UserActivityLayout;
