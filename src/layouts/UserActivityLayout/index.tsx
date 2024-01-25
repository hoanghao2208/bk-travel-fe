import UserActivityMenu from 'components/UserActivityMenu';
import UserFooter from 'components/UserFooter';
import UserLoginHeader from 'components/UserLoginHeader';
import {
    FC,
    PropsWithChildren,
    memo,
    useCallback,
    useEffect,
    useState,
} from 'react';
import './styles.scss';
import { Avatar, Modal, Upload } from 'antd';
import { UserOutlined, CameraOutlined, InboxOutlined } from '@ant-design/icons';
import { getCustomerId } from 'reducers/token/function';
import userService from 'services/userService';

interface UserInfo {
    firstname: string;
    lastname: string;
    email: string;
}

const defaultUserInfo: UserInfo = {
    firstname: '',
    lastname: '',
    email: '',
};

const UserActivityLayout: FC<PropsWithChildren> = memo(({ children }) => {
    const [avtModal, setAvtModal] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
    const handleCancel = () => {
        setAvtModal(false);
    };

    const handleGetUserData = useCallback(async () => {
        const user_id = getCustomerId();

        try {
            const response = await userService.getUserInfo(user_id);
            if (response?.status === 200) {
                setUserInfo(response?.data.user_info);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }, []);

    useEffect(() => {
        handleGetUserData();
    }, [handleGetUserData]);
    
    return (
        <>
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
                            // onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <Upload.Dragger
                                listType="picture-card"
                                // fileList={fileList}
                                // onChange={handleUpload}
                                beforeUpload={() => false}
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
        </>
    );
});

UserActivityLayout.displayName = 'User Activity Layout';

export default UserActivityLayout;
