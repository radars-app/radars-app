import { Injectable } from '@angular/core';
import { UserProfile, UserProfileDto } from '../model/user-profile';

@Injectable({
	providedIn: 'root',
})
export class UserProfileConverterService {
	constructor() {}

	public fromDto(dto: UserProfileDto): UserProfile {
		return {
			email: dto.mail,
			fullName: dto.displayName,
		};
	}
}
