import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { InteractionRequiredAuthError, AuthError } from 'msal';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { ContainerState } from '../../store/sample/sample.reducer';
import { SetTheme, GetUserPhoto } from '../../store/sample/sample.actions';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-radars-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {
  public profile;

  constructor(
	private http: HttpClient,
	private authService: MsalService,
	private store: Store<ContainerState>,
  ) { }

  ngOnInit(): void {
	this.getProfile();
  }

  getProfile(): void {
	this.http.get(GRAPH_ENDPOINT)
	.subscribe({
		next: (profile) => {
	this.profile = profile;
	console.log('profile', this.profile);
		},
		error: (err: AuthError) => {
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
		}
	});
  }

  logout(): void {
	this.authService.logout();
  }

  login(): void {
	this.authService.loginPopup();
  }

  toggleTheme(event: MatSlideToggleChange): void {
	  console.log('toggle', event);
	  if (event.checked) {
		this.store.dispatch(new SetTheme({ data: 'dark'}));
	  } else {
		this.store.dispatch(new SetTheme({ data: 'light'}));
	  }
  }

}
