import { Action } from '@ngrx/store';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';
import { RadarConfig } from '../../model/radar-config';

export enum RadarViewActionTypes {
	LoadRadars = '[RadarView] Load Radars',
	LoadRadarsSuccess = '[RadarView] Load Radars Success',
	LoadRadarDataItems = '[RadarView] Load Radar Data Items',
	LoadRadarDataItemsSuccess = '[RadarView] Load Radar Data Items Success',
	UploadRadar = '[RadarView] Upload Radars',
	SetSearchQuery = '[RadarView] Set Search Query',
	SetFilteredRadarItems = '[RadarView] Set Filtered Radar Items',
	RemoveRadar = '[RadarView] Remove Radar',
	RemoveRadarSuccess = '[RadarView] Remove Radar Success',
}

export class LoadRadars implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadars;
	constructor(public payload: string) {}
}

export class LoadRadarsSuccess implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadarsSuccess;
	constructor(public payload: Radar[]) {}
}

export class LoadRadarDataItems implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadarDataItems;
	constructor(public radarId: string) {}
}

export class LoadRadarDataItemsSuccess implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadarDataItemsSuccess;
	constructor(public payload: RadarDataItem[]) {}
}

export class UploadRadar implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.UploadRadar;
	constructor(public payload: { radarId: string; radarConfig: RadarConfig }) {}
}

export class SetSearchQuery implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.SetSearchQuery;
	constructor(public payload: string) {}
}

export class SetFilteredRadarItems implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.SetFilteredRadarItems;
	constructor(public payload: RadarDataItem[]) {}
}

export class RemoveRadar implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.RemoveRadar;
	constructor(public radarId: string) {}
}

export class RemoveRadarSuccess implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.RemoveRadarSuccess;
	constructor() {}
}

export type RadarViewActions =
	| LoadRadars
	| LoadRadarsSuccess
	| LoadRadarDataItems
	| LoadRadarDataItemsSuccess
	| UploadRadar
	| SetSearchQuery
	| SetFilteredRadarItems
	| RemoveRadar
	| RemoveRadarSuccess;
