import { Action } from '@ngrx/store';
import { ComponentTheme } from '../../../../shared/component-theme.enum';

export enum SampleActionTypes {
	SetTheme = '[Theme] Set theme',
	GetUserPhoto = '[Auth] Get user avatar',
	GetUserPhotoSuccess = '[Auth] User avatar is received',
	GetUserInfo = '[Auth] Get user info',
	GetUserInfoSuccess = '[Auth] Get user info success',
}

export class SetTheme implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.SetTheme;
	constructor(public payload: { data: ComponentTheme }) { }
}

export class GetUserPhoto implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.GetUserPhoto;
	constructor(public payload: { data: string }) { }
}

export class GetUserPhotoSuccess implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.GetUserPhotoSuccess;
	constructor(public payload: { data: string }) { }
}

export class GetUserInfo implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.GetUserInfo;
	constructor(public payload: { data: string }) { }
}

export class GetUserInfoSuccess implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.GetUserInfoSuccess;
	constructor(public payload: { data: any }) { }
}

/* export class LoadSamples implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.LoadSamples;
}

export class LoadSamplesSuccess implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.LoadSamplesSuccess;
	constructor(public payload: { data: any }) { }
}

export class LoadSamplesFailure implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.LoadSamplesFailure;
	constructor(public payload: { error: any }) { }
} */

export type SampleActions = SetTheme
| GetUserPhoto
| GetUserPhotoSuccess
| GetUserInfo
| GetUserInfoSuccess;
