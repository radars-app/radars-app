import { HttpBackend, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MsalService } from '@azure/msal-angular';
import { AuthResponse } from 'msal';

@Injectable({
	providedIn: 'root',
})
export class AuthRepositoryService {
	private http: HttpClient;

	constructor(private authService: MsalService, handler: HttpBackend) {
		this.http = new HttpClient(handler);
	}

	public getUserPhoto(): Observable<HttpResponse<Blob>> {
		return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] })).pipe(
			switchMap((token: AuthResponse) => {
				console.log(token);
				return this.http.get('https://graph.microsoft.com/beta/me/photo/$value', {
					headers: { Authorization: 'Bearer ' + token.accessToken },
					observe: 'response',
					responseType: 'blob',
				});
			})
		);
	}

	public getUserInfo(): Observable<HttpResponse<{}>> {
		return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] })).pipe(
			switchMap((token: AuthResponse) => {
				console.log(token);
				const GRAPH_ENDPOINT: string = 'https://graph.microsoft.com/v1.0/me';
				return this.http.get(GRAPH_ENDPOINT, {
					headers: { Authorization: 'Bearer ' + token.accessToken },
					observe: 'response',
				});
			})
		);
	}
}
