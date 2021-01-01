import { TestBed } from '@angular/core/testing';

import { RadarSorterService } from './radar-sorter.service';

describe('RadarSorterService', () => {
	let service: RadarSorterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RadarSorterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
