import { HttpClient } from '@angular/common/http';
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
				return this.http.get<UserProfileDto>('api/user', {
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	private loadToken(): Observable<AuthResponse> {
		return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] }));
	}
}
