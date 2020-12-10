import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { NEVER, Observable } from 'rxjs';
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
} from './radar-view.actions';
import { Action } from '@ngrx/store';

import { RadarsRepositoryService } from '../../service/radar-view-repository.service';
import { Radar, RadarDto } from '../../model/radar';
import { RadarConverterService } from '../../service/radar-converter.service';
import { RadarDataItem, RadarDataItemDto } from '../../model/radar-data-item';
import { RadarDataItemConverterService } from '../../service/radar-data-item-converter.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';

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
	public uploadRadar$: Observable<any> = this.actions$.pipe(
		ofType(RadarViewActionTypes.UploadRadar),
		switchMap((action: UploadRadar) => {
			return this.radarsRepositoryService.uploadRadar(action.payload.radarId, action.payload.radarConfig).pipe(
				map((radarDto: RadarDto) => {
					return new LoadRadars(radarDto.radarId);
				})
			);
		})
	);

	@Effect()
	public filterRadarItems$: Observable<any> = this.actions$.pipe(
		ofType(RadarViewActionTypes.SetSearchQuery, RadarViewActionTypes.LoadRadarDataItemsSuccess),
		withLatestFrom(this.radarViewFacadeService.radarDataItems$, this.radarViewFacadeService.searchQuery$),
		map(([_, radarDataItems, searchQuery]: [SetSearchQuery | LoadRadarDataItemsSuccess, RadarDataItem[], string]) => {
			let filteredDataItems: RadarDataItem[] = radarDataItems;

			if (Boolean(searchQuery)) {
				filteredDataItems = radarDataItems.filter((item: RadarDataItem) =>
					item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
				);
			}

			return new SetFilteredRadarItems(filteredDataItems);
		})
	);

	constructor(
		private actions$: Actions<RadarViewActions>,
		private radarsRepositoryService: RadarsRepositoryService,
		private radarConverterService: RadarConverterService,
		private radarDataItemsConverterService: RadarDataItemConverterService,
		private radarViewFacadeService: RadarViewFacadeService
	) {}
}
