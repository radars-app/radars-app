import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { RadarsGeneralViewFacadeService } from './radars-general-view-facade.service';

describe('RadarsGeneralViewFacadeService', () => {
	let service: RadarsGeneralViewFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: Store,
					useValue: {},
				},
			],
		});
		service = TestBed.inject(RadarsGeneralViewFacadeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
