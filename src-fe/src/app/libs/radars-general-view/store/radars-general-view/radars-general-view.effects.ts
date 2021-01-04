import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import {
	RadarsGeneralViewActionTypes,
	LoadRadarsWithDataSuccess,
	LoadRadarsWithData,
	RadarsGeneralViewActions,
} from './radars-general-view.actions';
import { RadarsGeneralViewRepository } from '../../service/radars-general-view-repository.service';
import { Radar, RadarDto } from '../../../radar-view/model/radar';
import { RadarConverterService } from '../../../radar-view/service/radar-converter.service';
import { RadarWithData } from '../../model/radar-with-data';
import { RadarDataItem, RadarDataItemDto } from '../../../radar-view/model/radar-data-item';
import { RadarDataItemConverterService } from '../../../radar-view/service/radar-data-item-converter.service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Injectable()
export class RadarsGeneralViewEffects {
	@Effect()
	public loadRadarsWithData$: Observable<Action> = this.actions$.pipe(
		ofType(RadarsGeneralViewActionTypes.LoadRadarsWithData),
		switchMap((action: LoadRadarsWithData) => {
			return this.radarsGeneralViewRepository.loadAllLatestRadars().pipe(
				map((dtoRadar: RadarDto[]) => {
					return dtoRadar.map((radarDto: RadarDto) => this.radarConverterService.fromDto(radarDto));
				}),
				mergeMap((radars: Radar[]) => {
					return combineLatest([
						of(radars),
						forkJoin(radars.map((radar: Radar) => this.radarsGeneralViewRepository.loadRadarDataItems(radar.id))),
					]);
				}),
				map(([radars, radarDataItemDto]: [Radar[], RadarDataItemDto[][]]) => {
					return radars.map((radar: Radar, index: number) => {
						const dataItems: RadarDataItem[] = radarDataItemDto[index].map((dto: RadarDataItemDto) =>
							this.dataItemConverter.fromDto(dto)
						);
						return {
							...radar,
							dataItems,
						};
					});
				}),
				map((radarWithData: RadarWithData[]) => {
					return new LoadRadarsWithDataSuccess(radarWithData);
				})
			);
		})
	);

	constructor(
		private actions$: Actions<RadarsGeneralViewActions>,
		private radarsGeneralViewRepository: RadarsGeneralViewRepository,
		private radarConverterService: RadarConverterService,
		private dataItemConverter: RadarDataItemConverterService
	) {}
}
