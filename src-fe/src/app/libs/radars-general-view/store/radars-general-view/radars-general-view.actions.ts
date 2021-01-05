import { Action } from '@ngrx/store';
import { RadarWithData } from '../../model/radar-with-data';

export enum RadarsGeneralViewActionTypes {
	LoadRadarsWithData = '[RadarsGeneralView] Load radars with data',
	LoadRadarsWithDataSuccess = '[RadarsGeneralView] Load radars with data Success',
}

export class LoadRadarsWithData implements Action {
	public readonly type: RadarsGeneralViewActionTypes = RadarsGeneralViewActionTypes.LoadRadarsWithData;
	constructor() {}
}
export class LoadRadarsWithDataSuccess implements Action {
	public readonly type: RadarsGeneralViewActionTypes = RadarsGeneralViewActionTypes.LoadRadarsWithDataSuccess;
	constructor(public payload: RadarWithData[]) {}
}

export type RadarsGeneralViewActions = LoadRadarsWithData | LoadRadarsWithData;
