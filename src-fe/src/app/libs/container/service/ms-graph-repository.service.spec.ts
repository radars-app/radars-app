import { TestBed } from '@angular/core/testing';

import { MsGraphRepositoryService } from './ms-graph-repository.service';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

describe('MsGraphRepositoryService', () => {
	let service: MsGraphRepositoryService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: MsalService,
					useValue: {},
				},
				{
					provide: HttpClient,
					useValue: {},
				},
			],
		});
		service = TestBed.inject(MsGraphRepositoryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
