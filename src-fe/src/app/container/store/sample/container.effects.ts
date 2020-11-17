import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable, from } from 'rxjs';
import { SampleActionTypes, SampleActions, GetUserPhotoSuccess, GetUserInfoSuccess } from './container.actions';
import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { AuthResponse } from 'msal';

@Injectable()
export class SampleEffects {

	@Effect()
	getUserPhoto$: Observable<GetUserPhotoSuccess> = this.actions$.pipe(
		ofType(SampleActionTypes.GetUserPhoto),
		switchMap(() => {
			return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] })).pipe(
				switchMap((token: AuthResponse) => {
					console.log(token);
					return this.http.get('https://graph.microsoft.com/beta/me/photo/$value',
						{
							headers: { Authorization: 'Bearer ' + token.accessToken }, observe: 'response',
							responseType: 'blob'
						}).pipe(
							switchMap((response: HttpResponse<Blob>) => {

								const promise: Promise<string> = new Promise(((resolve: Function, reject: Function) => {
									let base64data: string;
									console.log(response);
									const reader: FileReader = new FileReader();
									reader.readAsDataURL(response.body);
									reader.onloadend = () => {
										base64data = reader.result as string;
										resolve(base64data);
									};
								}));

								return from(promise);
							})).pipe(
								switchMap((base64: string) => {
								return of(new GetUserPhotoSuccess({ data: base64}));
							}));
					// catchError(err => of(new GetUserPhotoFailure(err)));
				}));

		})
	);

	@Effect()
	getUserInfo$: Observable<GetUserInfoSuccess> = this.actions$.pipe(
		ofType(SampleActionTypes.GetUserInfo),
		switchMap(() => {

			return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] })).pipe(
				switchMap((token: AuthResponse) => {
					console.log(token);
					const GRAPH_ENDPOINT: string = 'https://graph.microsoft.com/v1.0/me';
					return this.http.get(GRAPH_ENDPOINT,
						{
							headers: { Authorization: 'Bearer ' + token.accessToken }, observe: 'response',
							// responseType: "json"
						}).pipe(
							switchMap((profile: HttpResponse<{}>) => {
								return of(new GetUserInfoSuccess({ data: profile.body}));

					/* 				error: (err: AuthError) => {
									// If there is an interaction required error,
									// call one of the interactive methods and then make the request again.
									if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
										this.authService.acquireTokenPopup({
										scopes: this.authService.getScopesForEndpoint(GRAPH_ENDPOINT)
										})
										.then(() => {
										this.http.get(GRAPH_ENDPOINT)
											.toPromise()
											.then(profile => {
											this.profile = profile;
											});
										});
									}
									} */
								}
/* 								const promise = new Promise(((resolve, reject) => {
									let base64data;
									console.log(response);
									const reader = new FileReader();
									reader.readAsDataURL(response.body);
									reader.onloadend = () => {
										base64data = reader.result;
										resolve(base64data);
									};
								}));

								return from(promise); */
							));
				}));
		})
	);

	private http: HttpClient;

	constructor(
		private actions$: Actions<SampleActions>,
		private authService: MsalService,
		handler: HttpBackend,
	) {
		this.http = new HttpClient(handler);
	}

}
