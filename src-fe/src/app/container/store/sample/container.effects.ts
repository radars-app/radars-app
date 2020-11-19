import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SampleActionTypes, SampleActions, GetUserPhotoSuccess, GetUserInfoSuccess } from './container.actions';
import { HttpResponse } from '@angular/common/http';

import { AuthRepositoryService } from '../../../auth/sevices/auth-repository.service';
import { AuthConverterService } from '../../../auth/sevices/auth-converter.service';

@Injectable()
export class ContainerEffects {
	@Effect()
	public getUserPhoto$: Observable<GetUserPhotoSuccess> = this.actions$.pipe(
		ofType(SampleActionTypes.GetUserPhoto),
		switchMap(() => {
			return this.authRepositoryService
				.getUserPhoto()
				.pipe(switchMap((response: HttpResponse<Blob>) => this.authConverter.convertToPhotoURL(response)))
				.pipe(
					map((response: string) => of(new GetUserPhotoSuccess({ data: response })))
					// catchError(err => of(new GetUserPhotoFailure(err)));
				);
		})
	);

	@Effect()
	public getUserInfo$: Observable<GetUserInfoSuccess> = this.actions$.pipe(
		ofType(SampleActionTypes.GetUserInfo),
		switchMap(() => {
			return this.authRepositoryService
				.getUserInfo()
				.pipe(switchMap((response: HttpResponse<{}>) => of(new GetUserInfoSuccess({ data: response.body }))));
		})
	);

	constructor(
		private actions$: Actions<SampleActions>,
		private authRepositoryService: AuthRepositoryService,
		private authConverter: AuthConverterService
	) {}
}
