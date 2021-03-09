import { Action } from '@ngrx/store';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';

export enum RadarViewActionTypes {
	LoadRadar = '[RadarView] Load Radars',
	LoadRadarSuccess = '[RadarView] Load Radars Success',
	UploadRadar = '[RadarView] Upload Radars',
	UploadRadarSuccess = '[RadarView] Upload Radar Success',
	UploadRadarError = '[RadarView] Upload Radar Error',
	CreateRadar = '[RadarView] Create Radar',
	CreateRadarSuccess = '[RadarView] Create Radar Success',
	CreateRadarError = '[RadarView] Create Radar Error',
	SetSearchQuery = '[RadarView] Set Search Query',
	SetFilteredRadarItems = '[RadarView] Set Filtered Radar Items',
	RemoveRadar = '[RadarView] Remove Radar',
	RemoveRadarSuccess = '[RadarView] Remove Radar Success',
	RefreshCsv = '[RadarView] Refresch CSV',
}

export class LoadRadar implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadar;
	constructor(public payload: string) {}
}

export class RefreshCsv implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.RefreshCsv;
	constructor(public payload: string) {}
}

export class LoadRadarSuccess implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.LoadRadarSuccess;
	constructor(public payload: Radar) {}
}

export class UploadRadar implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.UploadRadar;
	constructor(public payload: Radar) {}
}

export class UploadRadarSuccess implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.UploadRadarSuccess;
	constructor(public radarId: string) {}
}

export class UploadRadarError implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.UploadRadarError;
	constructor() {}
}

export class CreateRadar implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.CreateRadar;
	constructor(public payload: Radar) {}
}

export class CreateRadarSuccess implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.CreateRadarSuccess;
	constructor(public radarId: string) {}
}

export class CreateRadarError implements Action {
	public readonly type: RadarViewActionTypes = RadarViewActionTypes.CreateRadarError;
	constructor() {}
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
	| LoadRadar
	| LoadRadarSuccess
	| UploadRadar
	| UploadRadarSuccess
	| UploadRadarError
	| SetSearchQuery
	| CreateRadar
	| CreateRadarSuccess
	| CreateRadarError
	| SetFilteredRadarItems
	| RemoveRadar
	| RemoveRadarSuccess
	| RefreshCsv;
