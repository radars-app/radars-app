import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { RadarsGeneralViewFacadeService } from '../../service/radars-general-view-facade.service';

import { RadarsGeneralViewEffects } from './radars-general-view.effects';

describe('RadarsGeneralViewEffects', () => {
	const actions$: Observable<any> = new Observable<any>();
	let effects: RadarsGeneralViewEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RadarsGeneralViewEffects,
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
					provide: RadarsGeneralViewFacadeService,
					useValue: {
						radarDataItems$: of([]),
						radars$: of([]),
						loadRadarDataItems: jasmine.createSpy().and.stub(),
					},
				},
			],
		});

		effects = TestBed.inject(RadarsGeneralViewEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
