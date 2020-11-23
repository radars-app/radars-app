import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { ContainerFacadeService } from './container-facade.service';

describe('ContainerFacadeService', () => {
	let service: ContainerFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: Store,
					useValue: {},
				},
			],
		});
		service = TestBed.inject(ContainerFacadeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
