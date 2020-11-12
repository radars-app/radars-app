import { Component, OnInit, Input } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { InteractionRequiredAuthError, AuthError } from 'msal';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { ContainerState } from '../../store/sample/sample.reducer';
import { SetTheme, GetUserPhoto } from '../../store/sample/sample.actions';
import { ContainerFacadeService } from '../../store/sample/container.facade';
import { Observable } from 'rxjs';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-radars-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {
  // @Input() public profile;
  public userProfile$: Observable<any> = this.containerFacadeService.selectUserProfile$;

  public appTheme$: Observable<string> = this.containerFacadeService.selectAppTheme$;

  constructor(
	private http: HttpClient,
	private authService: MsalService,
	private store: Store<ContainerState>,
	private containerFacadeService: ContainerFacadeService,
  ) { }

  ngOnInit(): void {
	// this.getProfile();
  }

  logout(): void {
	this.authService.logout();
  }

  login(): void {
	this.authService.loginPopup();
  }

  toggleTheme(event: MatSlideToggleChange): void {
	  if (event.checked) {
		this.store.dispatch(new SetTheme({ data: 'dark'}));
	  } else {
		this.store.dispatch(new SetTheme({ data: 'light'}));
	  }
  }

}
