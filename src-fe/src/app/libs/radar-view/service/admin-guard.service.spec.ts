import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContainerFacadeService } from '../../container/service/container-facade.service';

import { AdminGuardService } from './admin-guard.service';

describe('AdminGuardService', () => {
	let service: AdminGuardService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						isAdmin$: of(true),
					},
				},
			],
		});
		service = TestBed.inject(AdminGuardService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
