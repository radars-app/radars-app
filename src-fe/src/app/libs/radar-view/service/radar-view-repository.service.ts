import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthResponse } from 'msal';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RadarDto } from '../model/radar';

@Injectable({
	providedIn: 'root',
})
export class RadarsRepositoryService {
	constructor(private authService: MsalService, private http: HttpClient) {}

	public loadRadar(radarId: string, date: Date): Observable<RadarDto> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const RADARS_ENDPOINT: string = `/api/radars/${radarId}`;
				return this.http.get<RadarDto>(RADARS_ENDPOINT, {
					params: {
						date: date.toUTCString(),
					},
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	public createRadar(dto: RadarDto): Observable<RadarDto> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const RADARS_ENDPOINT: string = `/api/radars/`;
				return this.http.post<RadarDto>(RADARS_ENDPOINT, dto, {
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	public updateRadar(dto: RadarDto): Observable<RadarDto> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const RADARS_ENDPOINT: string = `/api/radars/${dto.uid}`;
				return this.http.put<RadarDto>(RADARS_ENDPOINT, dto, {
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	public removeRadar(radarId: string): Observable<RadarDto> {
		return this.loadToken().pipe(
			switchMap((token: AuthResponse) => {
				const endpoint: string = `/api/radars/${radarId}`;
				return this.http.delete<RadarDto>(endpoint, {
					headers: { Authorization: 'Bearer ' + token.accessToken },
				});
			})
		);
	}

	private loadToken(): Observable<AuthResponse> {
		return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] }));
	}
}
