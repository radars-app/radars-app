import { TestBed } from '@angular/core/testing';

import { RadarDataItemConverterService } from './radar-data-item-converter.service';

describe('RadarDataItemConverterService', () => {
	let service: RadarDataItemConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RadarDataItemConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
