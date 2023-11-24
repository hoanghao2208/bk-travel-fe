import { memo, useEffect } from 'react';
import UserActivityLayout from 'layouts/UserActivityLayout';
import Title from 'components/Title';
import ProfileItem from 'components/ProfileItem';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Thông tin cá nhân';
    });
    return (
        <UserActivityLayout>
            <div className="user-profile">
                <Title title="Thông tin cá nhân" />
                <div className="user-profile__content">
                    <div className="user-profile__content--item">
                        <ProfileItem
                            title="Họ của bạn"
                            defaultVal="Chưa có"
                            isDoB={false}
                            isEmail={false}
                        />
                    </div>
                    <div className="user-profile__content--item">
                        <ProfileItem
                            title="Tên của bạn"
                            defaultVal="Chưa có"
                            isDoB={false}
                            isEmail={false}
                        />
                    </div>
                    <div className="user-profile__content--item">
                        <ProfileItem title="Ngày sinh" defaultVal="Chưa có" />
                    </div>
                    <div className="user-profile__content--item">
                        <ProfileItem
                            title="Số điện thoại"
                            defaultVal="Chưa có"
                            isDoB={false}
                            isEmail={false}
                        />
                    </div>
                    <div className="user-profile__content--item">
                        <ProfileItem
                            title="Email"
                            defaultVal="Chưa có"
                            isDoB={false}
                            isEmail={true}
                        />
                    </div>
                </div>
            </div>
        </UserActivityLayout>
    );
});

Inner.displayName = 'User Profile Inner';

export default Inner;
