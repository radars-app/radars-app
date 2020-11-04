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
	{
		provide: MsalService,
		useValue: {},
	},
	{
		provide: BroadcastService,
		useValue: {},
	},
		]
	}).compileComponents();
  }));

  it('should create the app', () => {
	const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
	const app: AppComponent = fixture.debugElement.componentInstance;
	expect(app).toBeTruthy();
  });

});
