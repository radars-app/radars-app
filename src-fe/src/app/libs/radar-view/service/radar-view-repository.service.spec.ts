import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';

import { RadarsRepositoryService } from './radar-view-repository.service';

describe('RadarsRepositoryService', () => {
	let service: RadarsRepositoryService;

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
		service = TestBed.inject(RadarsRepositoryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
