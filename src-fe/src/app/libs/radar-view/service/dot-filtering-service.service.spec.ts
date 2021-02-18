import { TestBed } from '@angular/core/testing';

import { DotFilteringServiceService } from './dot-filtering-service.service';

describe('DotFilteringServiceService', () => {
	let service: DotFilteringServiceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DotFilteringServiceService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
