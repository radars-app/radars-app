import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable, NEVER } from 'rxjs';
import { ContainerActionTypes, LoadUserProfileSuccess, ContainerActions } from './container.actions';
import { Action } from '@ngrx/store';
import { MsalService } from '@azure/msal-angular';
import { UserProfile, UserProfileDto } from '../../model/user-profile';
import { UserProfileConverterService } from '../../service/user-profile-converter.service';
import { MsGraphRepositoryService } from '../../service/ms-graph-repository.service';

@Injectable()
export class ContainerEffects {
	@Effect({ dispatch: false })
	public logIn$: Observable<Action> = this.actions$.pipe(
		ofType(ContainerActionTypes.LogIn),
		filter(() => {
			return !this.msalService.getAccount();
		}),
		switchMap(() => {
			this.msalService.loginRedirect();
			return NEVER;
		})
	);

	@Effect({ dispatch: false })
	public logOut$: Observable<Action> = this.actions$.pipe(
		ofType(ContainerActionTypes.LogOut),
		switchMap(() => {
			this.msalService.logout();
			return NEVER;
		})
	);

	@Effect()
	public loadUserProfile$: Observable<Action> = this.actions$.pipe(
		ofType(ContainerActionTypes.LoadUserProfile),
		switchMap(() => {
			return this.msGraphRepository.loadUserProfile().pipe(
				map((dto: UserProfileDto) => {
					const userProfile: UserProfile = this.userProfileConverter.fromDto(dto);
					return new LoadUserProfileSuccess(userProfile);
				})
			);
		})
	);

	constructor(
		private actions$: Actions<ContainerActions>,
		private msGraphRepository: MsGraphRepositoryService,
		private userProfileConverter: UserProfileConverterService,
		private msalService: MsalService
	) {}
}
