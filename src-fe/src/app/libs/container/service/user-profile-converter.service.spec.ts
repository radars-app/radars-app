import { TestBed } from '@angular/core/testing';

import { UserProfileConverterService } from './user-profile-converter.service';

describe('UserProfileConverterService', () => {
	let service: UserProfileConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserProfileConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
