import { FC, memo, useState } from 'react';
import './styles.scss';
import { Button, DatePicker, Input } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';

interface ProfileItemProps {
    title: string;
    defaultVal: string;
    isDoB: boolean;
    isEmail: boolean;
}

const ProfileItem: FC<ProfileItemProps> = memo(
    ({ title, defaultVal, isDoB, isEmail }) => {
        const [focus, setFocus] = useState(false);

        return (
            <div className="profile-item">
                <div className="profile-item__header">
                    <h3 className="profile-item__header--title">{title}</h3>
                    {!isEmail && (
                        <span
                            className="profile-item__header--btn"
                            onClick={() => setFocus(!focus)}
                        >
                            {focus === true ? 'Huỷ' : 'Chỉnh sửa'}
                        </span>
                    )}
                </div>
                <div className="profile-item__content">
                    {isDoB === false ? (
                        <Input
                            defaultValue={defaultVal}
                            disabled={!focus}
                            placeholder={title}
                        />
                    ) : (
                        <DatePicker
                            placeholder="Ngày sinh"
                            format={DEFAULT_DISPLAY_DATE_FORMAT}
                            disabled={!focus}
                        />
                    )}
                </div>
                <div className="profile-item__footer">
                    {focus && (
                        <Button
                            type="primary"
                            icon={<CheckCircleFilled />}
                            size="large"
                        >
                            Lưu
                        </Button>
                    )}
                </div>
            </div>
        );
    }
);

ProfileItem.displayName = 'Profile Item';

export default ProfileItem;
