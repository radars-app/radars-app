import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable, NEVER } from 'rxjs';
import { RadarViewActionTypes, RadarViewActions } from './radar-view.actions';
import { HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { MsalService } from '@azure/msal-angular';

import { MsGraphRepositoryService } from 'src/app/libs/container/service/ms-graph-repository.service';

@Injectable()
export class RadarViewEffects {
	/* 	@Effect()
	public loadRadarConfig$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.LoadRadarConfig),
		switchMap(() => {
			return this.msGraphRepository.loadUserPhoto().pipe(
				switchMap((response: HttpResponse<Blob>) => {
					return this.userPhotoConverter.fromDto(response).pipe(
						map((base64Photo: string) => {
							return new LoadRadarConfigSuccess(base64Photo);
						})
					);
				})
			);
		})
	); */

	constructor(
		private actions$: Actions<RadarViewActions>,
		private msGraphRepository: MsGraphRepositoryService,
		// private userPhotoConverter: UserPhotoConverterService,
		// private userProfileConverter: UserProfileConverterService,
		private msalService: MsalService
	) {}
}
