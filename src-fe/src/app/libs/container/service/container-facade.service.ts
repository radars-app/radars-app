import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';
import { ComponentTheme } from '../../common-components/common/enum/component-theme.enum';
import { UserRole } from '../enum/user-role';
import { UserProfile } from '../model/user-profile';
import { LoadUserProfile, LogIn, LogOut, SetTheme } from '../store/container/container.actions';
import { selectTheme, selectUserProfile } from '../store/container/container.selectors';
import { ContainerState } from '../store/container/container.state';

@Injectable({
	providedIn: 'root',
})
export class ContainerFacadeService {
	constructor(private store: Store<ContainerState>) {}

	public get userPhotoBase64$(): Observable<string> {
		return this.store.pipe(select(selectUserProfile), pluck('photoBase64'));
	}

	public get userProfile$(): Observable<any> {
		return this.store.pipe(select(selectUserProfile));
	}

	public get isAdmin$(): Observable<boolean> {
		return this.store.pipe(
			select(selectUserProfile),
			filter((profile: UserProfile) => Boolean(profile)),
			pluck('role'),
			map((role: UserRole) => {
				return role === UserRole.Admin;
			})
		);
	}

	public get theme$(): Observable<ComponentTheme> {
		return this.store.pipe(select(selectTheme));
	}

	public get isDarkTheme$(): Observable<boolean> {
		return this.store.pipe(
			select(selectTheme),
			map((theme: ComponentTheme) => theme === ComponentTheme.Dark)
		);
	}

	public loadUserProfile(): void {
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
