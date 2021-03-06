import { Action } from '@ngrx/store';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { UserProfile } from '../../model/user-profile';

export enum ContainerActionTypes {
	SetTheme = '[Container] Set theme',
	LoadUserProfile = '[Container] Get User Profile',
	LoadUserProfileSuccess = '[Container] Get User Profile Success',
	LogIn = '[Container] Log In',
	LogOut = '[Container] Log Out',
}

export class SetTheme implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.SetTheme;
	constructor(public payload: ComponentTheme) {}
}

export class LogIn implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.LogIn;
	constructor() {}
}

export class LogOut implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.LogOut;
	constructor() {}
}

export class LoadUserProfile implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.LoadUserProfile;
	constructor() {}
}

export class LoadUserProfileSuccess implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.LoadUserProfileSuccess;
	constructor(public payload: UserProfile) {}
}

export type ContainerActions = SetTheme | LoadUserProfile | LoadUserProfileSuccess | SetTheme | LogIn | LogOut;
