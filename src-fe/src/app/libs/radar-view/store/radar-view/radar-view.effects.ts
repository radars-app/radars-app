import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RadarViewActionTypes, RadarViewActions, LoadRadarsSuccess, LoadRadars } from './radar-view.actions';
import { Action } from '@ngrx/store';

import { RadarsRepositoryService } from '../../service/radar-view-repository.service';
import { RadarEntity, RadarEntityDto } from '../../model/radar-entity.model';
import { RadarsConverterService } from '../../service/radars-converter.service';

@Injectable()
export class RadarViewEffects {
	@Effect()
	public loadRadars$: Observable<Action> = this.actions$.pipe(
		ofType(RadarViewActionTypes.LoadRadars),
		switchMap((action: LoadRadars) => {
			return this.radarsRepositoryService.downloadRadars(action.payload).pipe(
				map((dto: RadarEntityDto[]) => {
					const radarEntities: RadarEntity[] = dto.map((radarEntityDto: RadarEntityDto) =>
						this.radarsConverterService.fromDto(radarEntityDto)
					);
					return new LoadRadarsSuccess(radarEntities);
				})
			);
		})
	);

	constructor(
		private actions$: Actions<RadarViewActions>,
		private radarsRepositoryService: RadarsRepositoryService,
		private radarsConverterService: RadarsConverterService
	) {}
}
