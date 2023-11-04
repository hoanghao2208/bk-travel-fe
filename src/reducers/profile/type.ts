import { Optional } from 'utils/commonType';

interface IProfile {
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVIEWING';
}

export class ProfileState {
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phoneNumber: string;
    username: string;
    profile: IProfile;
    country: string;

    constructor(data?: IProfileState) {
        this.email = data?.email || '';
        this.firstName = data?.firstName || '';
        this.lastName = data?.lastName || '';
        this.fullName = data?.fullName || '';
        this.phoneNumber = data?.phoneNumber || '';
        this.username = data?.username || '';
        this.profile = data?.profile || { status: 'PENDING' };
        this.country = data?.country || '';
    }
}

export type IProfileState = Optional<ProfileState>;
