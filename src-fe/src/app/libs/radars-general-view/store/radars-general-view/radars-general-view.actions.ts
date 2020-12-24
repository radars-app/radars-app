import { Action } from '@ngrx/store';
import { Radar } from '../../../radar-view/model/radar';

export enum RadarsGeneralViewActionTypes {
	LoadAllLatestRadars = '[RadarsGeneralView] Load All Latest Radars',
	LoadAllLatestRadarsSuccess = '[RadarsGeneralView] Load All Latest Radars Success',
}

export class LoadAllLatestRadars implements Action {
	public readonly type: RadarsGeneralViewActionTypes = RadarsGeneralViewActionTypes.LoadAllLatestRadars;
	constructor() {}
}

export class LoadAllLatestRadarsSuccess implements Action {
	public readonly type: RadarsGeneralViewActionTypes = RadarsGeneralViewActionTypes.LoadAllLatestRadarsSuccess;
	constructor(public payload: Radar[]) {}
}

export type RadarsGeneralViewActions = LoadAllLatestRadars | LoadAllLatestRadars;
