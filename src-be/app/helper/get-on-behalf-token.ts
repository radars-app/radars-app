import axios, { AxiosResponse } from 'axios';
import config from '../../auth-config.json';

export async function getOnBehalfToken(userToken: string): Promise<string> {
	const [, tokenValue]: string[] = userToken.split(' ');
	const authority: string = config.metadata.authority;
	const tokenEndpoint: string = `https://${authority}/${config.credentials.tenantID}/oauth2/${config.metadata.version}/token`;

	const urlencoded: URLSearchParams = new URLSearchParams();
	urlencoded.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
	urlencoded.append('client_id', config.credentials.clientID);
	urlencoded.append('client_secret', config.credentials.clientSecret);
	urlencoded.append('assertion', tokenValue);
	urlencoded.append('scope', config.scopes as any);
	urlencoded.append('requested_token_use', 'on_behalf_of');

	const response: AxiosResponse = await axios.post(tokenEndpoint, urlencoded, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	const tokenObject: any = response.data;
	return Promise.resolve(tokenObject.access_token);
}
