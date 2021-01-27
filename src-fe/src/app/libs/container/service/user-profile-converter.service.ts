import { Injectable } from '@angular/core';
import { UserProfile, UserProfileDto } from '../model/user-profile';

@Injectable({
	providedIn: 'root',
})
export class UserProfileConverterService {
	constructor() {}

	public fromDto(dto: UserProfileDto): UserProfile {
		return {
			email: dto.email,
			fullName: dto.fullName,
			photoBase64: dto.photo,
			role: dto.role,
		};
	}
}
