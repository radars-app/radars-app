import { TestBed } from '@angular/core/testing';

import { RingToIconConverterService } from './ring-to-icon-converter.service';

describe('RingToIconConverterService', () => {
	let service: RingToIconConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RingToIconConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
