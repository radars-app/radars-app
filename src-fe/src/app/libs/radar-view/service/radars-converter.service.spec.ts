import { TestBed } from '@angular/core/testing';

import { RadarsConverterService } from './radars-converter.service';

describe('RadarsConverterService', () => {
	let service: RadarsConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RadarsConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
