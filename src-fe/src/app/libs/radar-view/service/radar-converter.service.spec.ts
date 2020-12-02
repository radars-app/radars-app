import { TestBed } from '@angular/core/testing';

import { RadarConverterService } from './radar-converter.service';

describe('RadarConverterService', () => {
	let service: RadarConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RadarConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
