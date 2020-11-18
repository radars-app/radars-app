import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContainerState } from './container.reducer';
import * as ContainerSelectors from './container.selectors';
import * as ContainerActions from './container.actions';
import { ComponentTheme } from 'src/shared/component-theme.enum';
import { MsalService } from '@azure/msal-angular';

@Injectable({
	providedIn: 'root',
})
export class ContainerFacadeService {
	constructor(private store: Store<ContainerState>, private authService: MsalService) {}

	get selectUserPhotoURL$(): Observable<string> {
		return this.store.pipe(select(ContainerSelectors.selectUserPhotoURL));
	}

	get selectUserProfile$(): Observable<any> {
		return this.store.pipe(select(ContainerSelectors.selectUserProfile));
	}

	get selectAppTheme$(): Observable<ComponentTheme> {
		return this.store.pipe(select(ContainerSelectors.selectTheme));
	}

	public loadUserPhoto(): void {
		this.store.dispatch(new ContainerActions.GetUserPhoto({ data: '' }));
	}

	public loadUserInfo(): void {
		this.store.dispatch(new ContainerActions.GetUserInfo({ data: '' }));
	}

	public setTheme(theme: ComponentTheme): void {
		this.store.dispatch(new ContainerActions.SetTheme({ data: theme }));
	}

	public logout(): void {
		this.authService.logout();
	}

	public login(): void {
		this.authService.loginPopup();
	}
}
