import { UserRole } from './user-role';

export interface UserEntity {
	fullName: string;
	email: string;
	role: UserRole;
	photo: string;
}

export interface UserProfileDto {
	userPrincipalName: string;
	displayName: string;
}
