import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthResponse } from 'msal';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RadarDto } from '../model/radar';
import { RadarDataItemDto } from '../model/radar-data-item';

@Injectable({
	providedIn: 'root',
})
export class RadarsRepositoryService {
	constructor(private authService: MsalService, private http: HttpClient) {}

	public loadRadars(radarId: string): Observable<RadarDto[]> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const RADARS_ENDPOINT: string = `/api/radars/${radarId}`;
				return this.http.get<RadarDto[]>(RADARS_ENDPOINT, {
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
