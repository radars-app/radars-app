import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import {
	RadarsGeneralViewActionTypes,
	LoadAllLatestRadarsSuccess,
	LoadAllLatestRadars,
	RadarsGeneralViewActions,
} from './radars-general-view.actions';
import { RadarsGeneralViewRepository } from '../../service/radars-general-view-repository.service';
import { Radar, RadarDto } from '../../../radar-view/model/radar';
import { RadarConverterService } from '../../../radar-view/service/radar-converter.service';

@Injectable()
export class RadarsGeneralViewEffects {
	@Effect()
	public loadRadars$: Observable<Action> = this.actions$.pipe(
		ofType(RadarsGeneralViewActionTypes.LoadAllLatestRadars),
		switchMap((action: LoadAllLatestRadars) => {
			return this.radarsGeneralViewRepositoryService.loadAllLatestRadars().pipe(
				map((dto: RadarDto[]) => {
					const radarEntities: Radar[] = dto.map((radarDto: RadarDto) => this.radarConverterService.fromDto(radarDto));
					return new LoadAllLatestRadarsSuccess(radarEntities);
				})
			);
		})
	);

	constructor(
		private actions$: Actions<RadarsGeneralViewActions>,
		private radarsGeneralViewRepositoryService: RadarsGeneralViewRepository,
		private radarConverterService: RadarConverterService
	) {}
}
