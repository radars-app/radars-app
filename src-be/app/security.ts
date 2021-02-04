import { Request } from 'express';
import { UserProfileDto } from './model/user-entity';
import roleConfig from '../role-config.json';
import axios, { AxiosResponse } from 'axios';
import { getOnBehalfToken } from './helper/get-on-behalf-token';

export async function expressAuthentication(request: Request, securityName: string, _: any): Promise<any> {
	const bearerToken: string = request.headers['authorization'] as string;
	if (securityName === 'admin-access') {
		axios.defaults.headers['authorization'] = await getOnBehalfToken(bearerToken);

		return axios
			.get('https://graph.microsoft.com/v1.0/me')
			.then((profileDto: AxiosResponse<UserProfileDto>) => {
				return roleConfig.admin.includes(profileDto.data.userPrincipalName);
			})
			.catch((error: string) => {
				console.log(error);
			});
	}
}
