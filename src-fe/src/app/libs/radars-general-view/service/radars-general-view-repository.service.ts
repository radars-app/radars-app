import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthResponse } from 'msal';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RadarDto } from '../../radar-view/model/radar';
import { RadarDataItemDto } from '../../radar-view/model/radar-data-item';

@Injectable({
	providedIn: 'root',
})
export class RadarsGeneralViewRepository {
	constructor(private authService: MsalService, private http: HttpClient) {}

	public loadAllLatestRadars(date: Date): Observable<RadarDto[]> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const ALL_RADARS_ENDPOINT: string = `/api/radars`;

				return this.http.get<RadarDto[]>(ALL_RADARS_ENDPOINT, {
					params: {
						date: date.toUTCString(),
					},
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	public loadRadarDataItems(radarId: string): Observable<RadarDataItemDto[]> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const RADARS_ENDPOINT: string = `/api/radar-data-items/${radarId}`;
				return this.http.get<RadarDataItemDto[]>(RADARS_ENDPOINT, {
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	private loadToken(): Observable<AuthResponse> {
		return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] }));
	}
}
