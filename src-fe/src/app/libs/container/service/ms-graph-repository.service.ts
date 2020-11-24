import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthResponse } from 'msal';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserProfileDto } from '../model/user-profile';

@Injectable({
	providedIn: 'root',
})
export class MsGraphRepositoryService {
	constructor(private authService: MsalService, private http: HttpClient) {}

	public loadUserProfile(): Observable<UserProfileDto> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const GRAPH_ENDPOINT: string = 'https://graph.microsoft.com/v1.0/me';
				return this.http.get<UserProfileDto>(GRAPH_ENDPOINT, {
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	public loadUserPhoto(): Observable<HttpResponse<Blob>> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				return this.http.get('https://graph.microsoft.com/beta/me/photo/$value', {
					headers: { Authorization: 'Bearer ' + token.accessToken },
					observe: 'response',
					responseType: 'blob',
				});
			})
		);
	}

	private loadToken(): Observable<AuthResponse> {
		return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] }));
	}
}
