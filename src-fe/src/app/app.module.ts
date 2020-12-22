import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import creds from '../../auth-config.json';
import { ContainerModule } from './libs/container/container.module';
import { GeneralRadarChartComponent } from './libs/radars-general-view/components/general-radar-chart/general-radar-chart.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ContainerModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		HttpClientModule,
		AppRoutingModule,
		MsalModule.forRoot(
			{
				auth: {
					clientId: creds.clientId,
					authority: creds.authority,
					redirectUri: creds.redirectUri,
				},
				cache: {
					cacheLocation: 'localStorage',
					storeAuthStateInCookie: false,
				},
			},
			{
				consentScopes: ['user.read', 'openid', 'profile'],
				unprotectedResources: [],
				protectedResourceMap: [['https://graph.microsoft.com/v1.0/me', ['user.read']]],
				extraQueryParameters: {},
			}
		),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MsalInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
