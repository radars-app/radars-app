import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ComponentTheme } from '../../common-components/common/enum/component-theme.enum';
import { LoadUserPhoto, LoadUserProfile, LogIn, LogOut, SetTheme } from '../store/container/container.actions';
import { selectTheme, selectUserPhotoBase64, selectUserProfile } from '../store/container/container.selectors';
import { ContainerState } from '../store/container/container.state';

@Injectable({
	providedIn: 'root',
})
export class ContainerFacadeService {
	constructor(private store: Store<ContainerState>) {}

	public get userPhotoBase64$(): Observable<string> {
		return this.store.pipe(select(selectUserPhotoBase64));
	}

	public get userProfile$(): Observable<any> {
		return this.store.pipe(select(selectUserProfile));
	}

	public get theme$(): Observable<ComponentTheme> {
		return this.store.pipe(select(selectTheme));
	}

	public loadUserPhoto(): void {
		this.store.dispatch(new LoadUserPhoto());
	}

	public loadUserInfo(): void {
		this.store.dispatch(new LoadUserProfile());
	}

	public setTheme(theme: ComponentTheme): void {
		this.store.dispatch(new SetTheme(theme));
	}

	public logOut(): void {
		this.store.dispatch(new LogOut());
	}

	public logIn(): void {
		this.store.dispatch(new LogIn());
	}
}
