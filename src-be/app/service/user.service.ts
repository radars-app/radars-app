import { Injectable } from '../ioc';
import { UserEntity, UserProfileDto } from '../model/user-entity';
import { UserRole } from '../model/user-role';
import axios, { AxiosResponse } from 'axios';
import roleConfig from '../../role-config.json';
import { getOnBehalfToken } from '../helper/get-on-behalf-token';

@Injectable()
export class UserService {
	public async getUser(bearerToken: string): Promise<UserEntity> {
		const user: UserEntity = {
			email: '',
			fullName: '',
			photo: '',
			role: UserRole.Default,
		};
		const onBehalfOfToken: string = await getOnBehalfToken(bearerToken);

		try {
			const profileDto: AxiosResponse<UserProfileDto> = await axios.get('https://graph.microsoft.com/v1.0/me', {
				headers: {
					Authorization: onBehalfOfToken,
				},
			});
			user.email = profileDto.data.userPrincipalName;
			user.fullName = profileDto.data.displayName;
		} catch (err) {
			throw new Error('Failed to load user profile');
		}

		try {
			const data: AxiosResponse<ArrayBuffer> = await axios.get('https://graph.microsoft.com/beta/me/photo/$value', {
				responseType: 'arraybuffer',
				headers: {
					Authorization: onBehalfOfToken,
				},
			});

			const photo: string = this.encodeImageToBase64(data.data, data.headers['content-type']);
			user.photo = photo;
		} catch (err) {
			user.photo = '';
		}

		user.role = roleConfig.admin.includes(user.email) ? UserRole.Admin : UserRole.Default;
		return Promise.resolve(user);
	}

	private encodeImageToBase64(image: ArrayBuffer, type: string): string {
		const url: string = Buffer.from(image).toString('base64');
		return `data:${type};base64,${url}`;
	}
}
