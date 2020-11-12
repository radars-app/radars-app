import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable, from } from 'rxjs';
import { SampleActionTypes, SampleActions, GetUserPhotoSuccess, GetUserInfoSuccess } from './sample.actions';
import { HttpClient, HttpBackend } from '@angular/common/http';
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
							headers: { Authorization: 'Bearer ' + token.accessToken }, observe: "response",
							responseType: "blob"
						}).pipe(
							switchMap((response) => {

								const promise = new Promise(((resolve, reject) => {
									let base64data;
									console.log(response);
									const reader = new FileReader();
									reader.readAsDataURL(response.body);
									reader.onloadend = () => {
										base64data = reader.result;
										resolve(base64data);
									};
								}));

								
								return from(promise);
							})).pipe(
								switchMap((base64: string) => {
								return of(new GetUserPhotoSuccess({ data: base64}));
							}));
					//return new GetUserPhotoSuccess({ data: 'base64data'});
				}));



			/* 		return this.moviesService.getMovieInfo(movieID).pipe(
					  map(data => {
						resultRequest = [data].map((x: {
						  id: number;
						  vote_average: number;
						  poster_path: string;
						  overview: string;
						  title: string;
						}) => ({
						  id: x.id,
						  voteAverage: x.vote_average,
						  posterPath: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${x.poster_path}`,
						  overview: x.overview,
						  title: x.title,
						  type: 'movie'
						}));
						return new GetUserPhotoSuccess(resultRequest);
					  }),
					  // catchError(err => of(new GetUserPhotoFailure(err)))
					); */
		})
	);

	@Effect()
	getUserInfo$: Observable<GetUserInfoSuccess> = this.actions$.pipe(
		ofType(SampleActionTypes.GetUserInfo),
		switchMap(() => {
			const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
			this.http.get(GRAPH_ENDPOINT)
			.pipe(
				map((profile) => {
			console.log('profile!!!!!!!!!!', profile);
			return of(new GetUserInfoSuccess({ data: profile}));

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
			}));
			return from(this.authService.acquireTokenSilent({ scopes: ['user.read'] })).pipe(
				switchMap((token: AuthResponse) => {
					console.log(token);
					return this.http.get('https://graph.microsoft.com/beta/me/photo/$value',
						{
							headers: { Authorization: 'Bearer ' + token.accessToken }, observe: "response",
							responseType: "blob"
						}).pipe(
							switchMap((response) => {

								const promise = new Promise(((resolve, reject) => {
									let base64data;
									console.log(response);
									const reader = new FileReader();
									reader.readAsDataURL(response.body);
									reader.onloadend = () => {
										base64data = reader.result;
										resolve(base64data);
									};
								}));

								
								return from(promise);
							})).pipe(
								switchMap((base64: string) => {
								return of(new GetUserPhotoSuccess({ data: base64}));
							}));
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
