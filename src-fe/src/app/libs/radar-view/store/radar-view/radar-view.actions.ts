import { Action } from '@ngrx/store';
import { RadarEntity } from '../../model/radar-entity.model';

export enum RadarViewActionTypes {
	LoadRadars = '[RadarView] Load Radars',
	LoadRadarsSuccess = '[RadarView] Load Radars Success',
}

export class LoadRadars implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadars;
	constructor(public payload: string) {}
}

export class LoadRadarsSuccess implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadarsSuccess;
	constructor(public payload: RadarEntity[]) {}
}

export type RadarViewActions = LoadRadars | LoadRadarsSuccess;
