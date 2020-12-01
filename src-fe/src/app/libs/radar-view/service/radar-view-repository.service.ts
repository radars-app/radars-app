import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthResponse } from 'msal';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RadarEntityDto } from '../model/radar-entity.model';

@Injectable({
	providedIn: 'root',
})
export class RadarViewRepositoryService {
	constructor(private authService: MsalService, private http: HttpClient) {}

	public downloadRadars(ID: string): Observable<RadarEntityDto[]> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const RADARS_ENDPOINT: string = `/api/radars/${ID}`;
				return this.http.get<RadarEntityDto[]>(RADARS_ENDPOINT, {
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	private loadToken(): Observable<AuthResponse> {
		return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] }));
	}
}
