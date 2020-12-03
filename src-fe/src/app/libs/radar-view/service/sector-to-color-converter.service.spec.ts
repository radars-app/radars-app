import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RadarViewFacadeService } from './radar-view-facade.service';

import { SectorToColorConverterService } from './sector-to-color-converter.service';

describe('SectorToColorConverterService', () => {
	let service: SectorToColorConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SectorToColorConverterService,
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([
							{
								id: '1',
								name: 'Radar1',
								lastUpdatedDate: '12/1/2020',
								config: {
									name: 'Radar1',
									csv: 'string',
								},
							},
						]),
						loadRadars: jasmine.createSpy().and.stub(),
					},
				},
			],
		});
		service = TestBed.inject(SectorToColorConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
