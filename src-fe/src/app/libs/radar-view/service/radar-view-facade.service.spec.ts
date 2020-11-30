import { TestBed } from '@angular/core/testing';

import { RadarViewFacadeService } from './radar-view-facade.service';

describe('RadarViewFacadeService', () => {
	let service: RadarViewFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RadarViewFacadeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
