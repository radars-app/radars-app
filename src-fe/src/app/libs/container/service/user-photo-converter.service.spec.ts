import { TestBed } from '@angular/core/testing';

import { UserPhotoConverterService } from './user-photo-converter.service';

describe('UserPhotoConverterService', () => {
	let service: UserPhotoConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserPhotoConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
