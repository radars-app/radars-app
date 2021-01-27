import { UserRole } from '../enum/user-role';

export interface UserProfile {
	email: string;
	fullName: string;
	role: UserRole;
	photoBase64: string;
}

export interface UserProfileDto {
	email: string;
	fullName: string;
	role: UserRole;
	photo: string;
}
