import { Injectable } from '../ioc';
import { UserEntity, UserProfileDto } from 'app/model/user-entity';
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
			user.email = '';
			user.fullName = '';
		}

		try {
			const data: AxiosResponse<string> = await axios.get('https://graph.microsoft.com/beta/me/photo/$value', {
				responseType: 'arraybuffer',
				headers: {
					Authorization: onBehalfOfToken,
				},
			});

			const photo: string = Buffer.from(data.data, 'binary').toString('base64');
			user.photo = photo;
		} catch (err) {
			user.photo = '';
		}

		user.role = roleConfig.admin.includes(user.email) ? UserRole.Admin : UserRole.Default;

		return Promise.resolve(user);
	}
}
