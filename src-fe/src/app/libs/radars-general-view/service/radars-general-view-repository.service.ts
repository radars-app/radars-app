import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthResponse } from 'msal';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RadarDto } from '../../radar-view/model/radar';

@Injectable({
	providedIn: 'root',
})
export class RadarsGeneralViewRepositoryService {
	constructor(private authService: MsalService, private http: HttpClient) {}

	public loadAllLatestRadars(): Observable<RadarDto[]> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const ALL_RADARS_ENDPOINT: string = `/api/radars`;

				return this.http.get<RadarDto[]>(ALL_RADARS_ENDPOINT, {
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	private loadToken(): Observable<AuthResponse> {
		return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] }));
	}
}
