import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { NEVER, Observable } from 'rxjs';
import {
	RadarViewActionTypes,
	RadarViewActions,
	LoadRadarsSuccess,
	LoadRadars,
	LoadRadarDataItems,
	LoadRadarDataItemsSuccess,
	UploadRadar,
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
			return this.radarsRepositoryService.loadRadarDataItems(action.radarId).pipe(
				map((radarDataItemsDto: RadarDataItemDto[]) => {
					const items: RadarDataItem[] = radarDataItemsDto.map((dto: RadarDataItemDto) =>
						this.radarDataItemsConverterService.fromDto(dto)
					);
					return new LoadRadarDataItemsSuccess(items);
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

	constructor(
		private actions$: Actions<RadarViewActions>,
		private radarsRepositoryService: RadarsRepositoryService,
		private radarConverterService: RadarConverterService,
		private radarDataItemsConverterService: RadarDataItemConverterService,
		private radarViewFacadeService: RadarViewFacadeService
	) {}
}
