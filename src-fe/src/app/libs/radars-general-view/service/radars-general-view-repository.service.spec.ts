import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';

import { RadarsGeneralViewRepository } from './radars-general-view-repository.service';

describe('RadarsGeneralViewRepositoryService', () => {
	let service: RadarsGeneralViewRepository;

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
		service = TestBed.inject(RadarsGeneralViewRepository);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
