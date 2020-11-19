import { TestBed } from '@angular/core/testing';

import { AuthConverterService } from './auth-converter.service';

describe('AuthConverterService', () => {
	let service: AuthConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
