import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ContainerEffects } from './container.effects';

describe('ContainerEffects', () => {
	const actions$: Observable<any> = new Observable<any>();
	let effects: ContainerEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContainerEffects,
				provideMockActions(() => actions$),
				{
					provide: MsalService,
					useValue: {},
				},
				{
					provide: HttpClient,
					useValue: {},
				},
			],
		});

		effects = TestBed.inject(ContainerEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
