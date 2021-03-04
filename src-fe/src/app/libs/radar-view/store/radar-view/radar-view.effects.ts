import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { NEVER, Observable, of } from 'rxjs';
import {
	RadarViewActionTypes,
	LoadRadarSuccess,
	LoadRadar,
	UploadRadar,
	RadarViewActions,
	SetFilteredRadarItems,
	RemoveRadar,
	RemoveRadarSuccess,
	CreateRadar,
	CreateRadarSuccess,
	UploadRadarSuccess,
	UploadRadarError,
	CreateRadarError,
} from './radar-view.actions';
import { Action } from '@ngrx/store';
import { RadarsRepositoryService } from '../../service/radar-view-repository.service';
import { Radar, RadarDto } from '../../model/radar';
import { RadarConverterService } from '../../service/radar-converter.service';
import { RadarDataItem } from '../../model/radar-data-item';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { ToastNotificationService } from 'src/app/libs/common-components/toast-notification/service/toast-notification.service';
import { DotFilteringServiceService } from '../../service/dot-filtering-service.service';
import { Router } from '@angular/router';

@Injectable()
export class RadarViewEffects {
	@Effect()
	public loadRadar$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.LoadRadar),
		switchMap((action: LoadRadar) => {
			return this.radarsRepositoryService.loadRadar(action.payload, new Date()).pipe(
				map((dto: RadarDto) => {
					return new LoadRadarSuccess(this.radarConverterService.fromDto(dto));
				})
			);
		})
	);

	@Effect()
	public removeRadar$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.RemoveRadar),
		switchMap((action: RemoveRadar) => {
			return this.radarsRepositoryService.removeRadar(action.radarId).pipe(
				map(() => {
					this.router.navigateByUrl('/');
					return new RemoveRadarSuccess();
				})
			);
		})
	);

	@Effect()
	public uploadRadar$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.UploadRadar),
		switchMap((action: UploadRadar) => {
			const radar: RadarDto = this.radarConverterService.toDto(action.payload);
			return this.radarsRepositoryService.updateRadar(radar).pipe(
				map((radarDto: RadarDto) => {
					return new UploadRadarSuccess(radarDto.uid);
				}),
				catchError(() => {
					return of(new UploadRadarError());
				})
			);
		})
	);

	@Effect()
	public createRadar$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.CreateRadar),
		switchMap((action: CreateRadar) => {
			const dto: RadarDto = this.radarConverterService.toDto(action.payload);
			return this.radarsRepositoryService.createRadar(dto).pipe(
				map((radarDto: RadarDto) => {
					return new CreateRadarSuccess(radarDto.uid);
				}),
				catchError(() => {
					return of(new CreateRadarError());
				})
			);
		})
	);

	@Effect({ dispatch: false })
	public createRadarSuccessNotification$: Observable<any> = this.actions$.pipe(
		ofType(RadarViewActionTypes.CreateRadarSuccess),
		map(() => {
			this.toastNotificationService.success('Radar has been created', 'All radar information was saved.');
			return NEVER;
		})
	);

	@Effect({ dispatch: false })
	public uploadRadarSuccessNotification$: Observable<any> = this.actions$.pipe(
		ofType(RadarViewActionTypes.UploadRadarSuccess),
		map(() => {
			this.toastNotificationService.success('Radar has been saved', 'All radar information was saved.');
			return NEVER;
		})
	);

	@Effect({ dispatch: false })
	public uploadRadarErrorNotification$: Observable<any> = this.actions$.pipe(
		ofType(RadarViewActionTypes.UploadRadarError),
		map(() => {
			this.toastNotificationService.error('Someting wen wrong', 'Radar was not saved succesully. Please try again later.');
			return NEVER;
		})
	);

	@Effect({ dispatch: false })
	public createRadarErrorNotification$: Observable<any> = this.actions$.pipe(
		ofType(RadarViewActionTypes.CreateRadarError),
		map(() => {
			this.toastNotificationService.error('Something went wrong', 'Radar was not created. Please try again later.');
			return NEVER;
		})
	);

	@Effect()
	public loadDataAfterUpdatingRadar$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.CreateRadarSuccess, RadarViewActionTypes.UploadRadarSuccess),
		map((action: CreateRadarSuccess | UploadRadarSuccess) => {
			return new LoadRadar(action.radarId);
		})
	);

	@Effect()
	public filterRadarItems$: Observable<any> = this.actions$.pipe(
		ofType(RadarViewActionTypes.SetSearchQuery, RadarViewActionTypes.LoadRadarSuccess),
		withLatestFrom(
			this.radarViewFacadeService.radar$.pipe(filter((radar: Radar) => Boolean(radar))),
			this.radarViewFacadeService.searchQuery$
		),
		map(([_, radar, searchQuery]: [Action, Radar, string]) => {
			let filteredDataItems: RadarDataItem[] = radar.items;

			if (Boolean(searchQuery)) {
				filteredDataItems = this.dotFilteringService.filterDotsBySearchQuery(searchQuery, radar.items);
			}

			return new SetFilteredRadarItems(filteredDataItems);
		})
	);

	constructor(
		private actions$: Actions<RadarViewActions>,
		private radarsRepositoryService: RadarsRepositoryService,
		private radarConverterService: RadarConverterService,
		private radarViewFacadeService: RadarViewFacadeService,
		private toastNotificationService: ToastNotificationService,
		private dotFilteringService: DotFilteringServiceService,
		private router: Router
	) {}
}
