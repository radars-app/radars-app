import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  BroadcastService,
  MsalService,
} from '@azure/msal-angular';
import {
  Logger,
  CryptoUtils,
  AuthError,
  AuthResponse,
  LogLevel,
} from 'msal';
import { ContainerFacadeService } from './container/store/sample/container.facade';

/* istanbul ignore next */
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public title: string = 'radars-app';
  public loggedIn: boolean = false;

  constructor(
	private broadcastService: BroadcastService,
  private authService: MsalService,
  private http: HttpClient,
  private containerFacadeService: ContainerFacadeService,
  ) { }

  ngOnInit(): void {
	this.checkAccount();

	this.broadcastService.subscribe('msal:loginSuccess', () => {
		this.checkAccount();
	});

	this.authService.handleRedirectCallback((authError: AuthError, response: AuthResponse) => {
		if (authError) {
		console.error('Redirect Error: ', authError.errorMessage);
		return;
		}

		console.log('Redirect Success: ', response.accessToken);
	});

	this.authService.setLogger(new Logger((logLevel: LogLevel, message: string, piiEnabled: boolean) => {
		console.log('MSAL Logging: ', message);
	}, {
		correlationId: CryptoUtils.createNewGuid(),
		piiLoggingEnabled: false
  }));

  this.containerFacadeService.loadUserPhoto();
  }

  checkAccount(): void {
	  this.loggedIn = !!this.authService.getAccount();
  }

  login(): void {
	  this.authService.loginPopup();
  }

  logout(): void {
	this.authService.logout();

/*     this.authService.acquireTokenPopup({
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'http://localhost:8080',
      scopes: ['https://graph.microsoft.com/User.Read']
    }).then(magic => {
      console.log(magic);
      // this.httpClient.get('/sample/testuser228322').subscribe((a) => console.log(a));
    }); */
  }
}
