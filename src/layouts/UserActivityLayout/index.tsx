import UserActivityMenu from 'components/UserActivityMenu';
import UserFooter from 'components/UserFooter';
import UserLoginHeader from 'components/UserLoginHeader';
import { FC, PropsWithChildren, memo, useState } from 'react';
import './styles.scss';
import { Avatar, Modal, Upload } from 'antd';
import { UserOutlined, CameraOutlined, InboxOutlined } from '@ant-design/icons';

const UserActivityLayout: FC<PropsWithChildren> = memo(({ children }) => {
    const [avtModal, setAvtModal] = useState<boolean>(false);
    const handleCancel = () => {
        setAvtModal(false);
    };
    return (
        <>
            <UserLoginHeader />
            <div className="user-activity-wrapper">
                <div className="user-activity">
                    <div className="user-activity__menu">
                        <div className="user-activity__menu--avt">
                            <div className="user-activity__menu--avt-wrapper">
                                <Avatar size={116} icon={<UserOutlined />} />
                                <div
                                    className="user-activity__menu--avt-change"
                                    onClick={() => setAvtModal(true)}
                                >
                                    <CameraOutlined className="user-activity__menu--avt-icon" />
                                    <span>Thay đổi</span>
                                </div>
                            </div>
                            <h3 className="user-activity__menu--name">
                                Dương Hoàng Hảo
                            </h3>
                            <p className="user-activity__menu--email">
                                hao.duonghaokhmt@hcmut.edu.com
                            </p>
                        </div>
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
