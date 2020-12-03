import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { RadarViewFacadeService } from './radar-view-facade.service';

describe('RadarViewFacadeService', () => {
	let service: RadarViewFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: Store,
					useValue: {},
				},
			],
		});
		service = TestBed.inject(RadarViewFacadeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
