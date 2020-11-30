import { Action } from '@ngrx/store';
import { RadarEntity } from '../../model/radar-entity.model';

export enum RadarViewActionTypes {
	LoadRadarConfig = '[RadarView] Load Radar Config',
	LoadRadarConfigSuccess = '[RadarView] Load Radar Config Success',
}

export class LoadRadars implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadarConfig;
	constructor(public payload: string) {}
}

export class LoadRadarsSuccess implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadarConfigSuccess;
	constructor(public payload: RadarEntity) {}
}

export type RadarViewActions = LoadRadars | LoadRadarsSuccess;
