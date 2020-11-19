import { TestBed } from '@angular/core/testing';

import { MsGraphRepositoryService } from './ms-graph-repository.service';

describe('MsGraphRepositoryService', () => {
	let service: MsGraphRepositoryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MsGraphRepositoryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
