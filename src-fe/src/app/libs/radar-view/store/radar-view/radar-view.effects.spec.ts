import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ToastNotificationService } from 'src/app/libs/common-components/toast-notification/service/toast-notification.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';

import { RadarViewEffects } from './radar-view.effects';

describe('RadarViewEffects', () => {
	const actions$: Observable<any> = new Observable<any>();
	let effects: RadarViewEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RadarViewEffects,
				provideMockActions(() => actions$),
				{
					provide: MsalService,
					useValue: {},
				},
				{
					provide: HttpClient,
					useValue: {},
				},
				{
					provide: RadarViewFacadeService,
					useValue: {
						radar$: of({}),
					},
				},
				{
					provide: ToastNotificationService,
					useValue: {
						success: jasmine.createSpy(),
						error: jasmine.createSpy(),
					},
				},
				{
					provide: Router,
					useValue: {
						navigateByUrl: jasmine.createSpy(),
					},
				},
			],
		});

		effects = TestBed.inject(RadarViewEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
