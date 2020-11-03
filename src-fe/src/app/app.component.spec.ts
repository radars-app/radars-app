import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BroadcastService, MsalService, MsalAngularConfiguration } from '@azure/msal-angular';
import { MSAL_CONFIG, MSAL_CONFIG_ANGULAR } from '@azure/msal-angular';
import { Configuration } from 'msal';

import creds from '../../auth-config.json';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		imports: [
			RouterTestingModule,
			HttpClientModule,
		],
		declarations: [
			AppComponent
		],
		providers: [
			MsalService,
		{
			provide: MSAL_CONFIG,
			useValue: {
			auth: {
				clientId: creds.clientId, // This is your client ID
				authority: creds.authority, // This is your tenant info
				redirectUri: creds.redirectUri // This is your redirect URI
			},
			cache: {
				cacheLocation: 'localStorage',
				storeAuthStateInCookie: false
			},
			} as Configuration
		},
		{
			provide: MSAL_CONFIG_ANGULAR,
			useValue: {
			popUp: false,
			consentScopes: [ 'user.read' ],
			unprotectedResources: [],
			protectedResourceMap: [
				['https://graph.microsoft.com/v1.0/me', ['user.read']]
			]
			} as MsalAngularConfiguration
		},
		BroadcastService
		]
	}).compileComponents();
  }));

  it('should create the app', () => {
	const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
	const app: AppComponent = fixture.debugElement.componentInstance;
	expect(app).toBeTruthy();
  });

  it(`should have as title 'radars-app'`, () => {
	const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
	const app: AppComponent = fixture.debugElement.componentInstance;
	expect(app.title).toEqual('radars-app');
  });

  it(`should have false value for isIframe`, () => {
	const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
	const app: AppComponent = fixture.debugElement.componentInstance;
	expect(app.isIframe).toEqual(false);
  });

  it(`should have false value for isIframe`, () => {
	const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
	const app: AppComponent = fixture.debugElement.componentInstance;
	expect(app.loggedIn).toEqual(false);
  });

  it('should render title', () => {
	const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
	fixture.detectChanges();
	const compiled: HTMLElement = fixture.debugElement.nativeElement as HTMLElement;
	expect(compiled.querySelector('button').textContent).toContain('Log');
  });
});
