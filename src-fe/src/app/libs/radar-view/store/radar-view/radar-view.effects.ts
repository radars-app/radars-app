import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { NEVER, Observable, of } from 'rxjs';
import {
	RadarViewActionTypes,
	LoadRadarsSuccess,
	LoadRadars,
	LoadRadarDataItems,
	LoadRadarDataItemsSuccess,
	UploadRadar,
	RadarViewActions,
	SetFilteredRadarItems,
	SetSearchQuery,
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
import { RadarDataItem, RadarDataItemDto } from '../../model/radar-data-item';
import { RadarDataItemConverterService } from '../../service/radar-data-item-converter.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { ToastNotificationService } from 'src/app/libs/common-components/toast-notification/service/toast-notification.service';
import { DotFilteringServiceService } from '../../service/dot-filtering-service.service';
import { Router } from '@angular/router';

@Injectable()
export class RadarViewEffects {
	@Effect()
	public loadRadars$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.LoadRadars),
		switchMap((action: LoadRadars) => {
			return this.radarsRepositoryService.loadRadars(action.payload).pipe(
				map((dto: RadarDto[]) => {
					const radarEntities: Radar[] = dto.map((radarDto: RadarDto) => this.radarConverterService.fromDto(radarDto));
					return new LoadRadarsSuccess(radarEntities);
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

	@Effect({ dispatch: false })
	public loadLatestRadarDataItemsWhenRadarsLoaded$: Observable<void> = this.actions$.pipe(
		ofType(RadarViewActionTypes.LoadRadarsSuccess),
		switchMap((action: LoadRadarsSuccess) => {
			this.radarViewFacadeService.loadRadarDataItems(action.payload[0].id);
			return NEVER;
		})
	);

	@Effect()
	public loadRadarDataItems$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.LoadRadarDataItems),
		switchMap((action: LoadRadarDataItems) => {
			return this.radarViewFacadeService.radars$.pipe(
				take(1),
				switchMap((radars: Radar[]) => {
					return this.radarsRepositoryService.loadRadarDataItems(action.radarId).pipe(
						map((radarDataItemsDto: RadarDataItemDto[]) => {
							const items: RadarDataItem[] = radarDataItemsDto.map((dto: RadarDataItemDto) =>
								this.radarDataItemsConverterService.fromDto(dto)
							);
							const radar: Radar = radars[radars.length - 1];
							let number: number = 0;
							radar.sectors.forEach((sector: string) => {
								radar.rings.forEach((ring: string) => {
									const findedRadarItems: RadarDataItem[] = items.filter(
										(item: RadarDataItem) => item.ring === ring && item.sector === sector
									);
									findedRadarItems.forEach((item: RadarDataItem) => {
										item.number = ++number;
									});
								});
							});
							return new LoadRadarDataItemsSuccess(items);
						})
					);
				})
			);
		})
	);

	@Effect()
	public uploadRadar$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.UploadRadar),
		switchMap((action: UploadRadar) => {
			return this.radarsRepositoryService.uploadRadar(action.payload.radarId, action.payload.radarConfig).pipe(
				map((radarDto: RadarDto) => {
					return new UploadRadarSuccess(radarDto.radarId);
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
			return this.radarsRepositoryService.uploadRadar(action.payload.radarId, action.payload.radarConfig).pipe(
				map((radarDto: RadarDto) => {
					return new CreateRadarSuccess(radarDto.radarId);
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
			return new LoadRadars(action.radarId);
		})
	);

	@Effect()
	public filterRadarItems$: Observable<any> = this.actions$.pipe(
		ofType(RadarViewActionTypes.SetSearchQuery, RadarViewActionTypes.LoadRadarDataItemsSuccess),
		withLatestFrom(this.radarViewFacadeService.radarDataItems$, this.radarViewFacadeService.searchQuery$),
		map(([_, radarDataItems, searchQuery]: [SetSearchQuery | LoadRadarDataItemsSuccess, RadarDataItem[], string]) => {
			let filteredDataItems: RadarDataItem[] = radarDataItems;

			if (Boolean(searchQuery)) {
				filteredDataItems = this.dotFilteringService.filterDotsBySearchQuery(searchQuery, radarDataItems);
			}

			return new SetFilteredRadarItems(filteredDataItems);
		})
	);

	constructor(
		private actions$: Actions<RadarViewActions>,
		private radarsRepositoryService: RadarsRepositoryService,
		private radarConverterService: RadarConverterService,
		private radarDataItemsConverterService: RadarDataItemConverterService,
		private radarViewFacadeService: RadarViewFacadeService,
		private toastNotificationService: ToastNotificationService,
		private dotFilteringService: DotFilteringServiceService,
		private router: Router
	) {}
}
