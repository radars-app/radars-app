import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
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

@Injectable()
export class RadarsGeneralViewEffects {
	@Effect()
	public loadRadarsWithData$: Observable<Action> = this.actions$.pipe(
		ofType(RadarsGeneralViewActionTypes.LoadRadarsWithData),
		switchMap((action: LoadRadarsWithData) => {
			return this.radarsGeneralViewRepository.loadAllLatestRadars(new Date()).pipe(
				map((dtoRadar: RadarDto[]) => {
					return dtoRadar.map((radarDto: RadarDto) => this.radarConverterService.fromDto(radarDto));
				}),
				map((radars: Radar[]) => {
					return new LoadRadarsWithDataSuccess(radars);
				})
			);
		})
	);

	constructor(
		private actions$: Actions<RadarsGeneralViewActions>,
		private radarsGeneralViewRepository: RadarsGeneralViewRepository,
		private radarConverterService: RadarConverterService
	) {}
}
