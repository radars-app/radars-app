import { TestBed } from '@angular/core/testing';
import { Radar, RadarDto } from '../model/radar';

import { RadarConverterService } from './radar-converter.service';
import { RadarDataItemConverterService } from './radar-data-item-converter.service';

describe('RadarConverterService', () => {
	let service: RadarConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RadarDataItemConverterService, RadarConverterService],
		});
		service = TestBed.inject(RadarConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('when to dto called', () => {
		it('convert succesfully', () => {
			expect(
				service.toDto({
					lastUpdatedAt: new Date(),
					sectors: [],
					rings: [],
					items: [],
				} as Radar)
			).toBeDefined();
		});
	});

	describe('when from dto called', () => {
		it('convert succesfully', () => {
			expect(
				service.fromDto({
					lastUpdatedAt: new Date().toUTCString(),
					sectors: [],
					rings: [],
					items: [],
				} as RadarDto)
			).toBeDefined();
		});
	});
});
