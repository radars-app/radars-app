import { TestBed } from '@angular/core/testing';

import { RadarViewRepositoryService } from './radar-view-repository.service';

describe('RadarViewRepositoryService', () => {
	let service: RadarViewRepositoryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RadarViewRepositoryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
