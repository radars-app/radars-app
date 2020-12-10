import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RadarViewFacadeService } from './radar-view-facade.service';

import { RingToIconConverterService } from './ring-to-icon-converter.service';

describe('RingToIconConverterService', () => {
	let service: RingToIconConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([{ lastUpdatedAt: new Date(), sectors: [], rings: [] }]),
						radarDataItems$: of([]),
						filteredRadarDataItems$: of([]),
					},
				},
			],
		});
		service = TestBed.inject(RingToIconConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
