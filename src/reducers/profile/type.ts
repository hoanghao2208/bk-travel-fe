import { Optional } from 'utils/commonType';

interface IProfile {
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVIEWING';
}

export class ProfileState {
    user_id: number;
    password: string;
    firstname: string;
    lastname: string;
    gender: string;
    dob: string;
    avatar: string;
    phone_number: string;
    email: string;
    role_user: string;
    profile: IProfile;

    constructor(data?: IProfileState) {
        this.user_id = data?.user_id || 0;
        this.password = data?.password || '';
        this.firstname = data?.firstname || '';
        this.lastname = data?.lastname || '';
        this.gender = data?.gender || '';
        this.dob = data?.dob || '';
        this.avatar = data?.avatar || '';
        this.phone_number = data?.phone_number || '';
        this.email = data?.email || '';
        this.role_user = data?.role_user || '';
        this.profile = data?.profile || { status: 'PENDING' };
    }
}

export type IProfileState = Optional<ProfileState>;
