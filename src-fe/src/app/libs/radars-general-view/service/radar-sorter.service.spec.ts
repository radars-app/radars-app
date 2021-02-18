import { TestBed } from '@angular/core/testing';
import { Radar } from '../../radar-view/model/radar';

import { RadarSorterService } from './radar-sorter.service';

describe('RadarSorterService', () => {
	let service: RadarSorterService;

	const firstItem: Partial<Radar> = {
		id: 'id',
		name: 'a',
		lastUpdatedDate: new Date(Date.now()),
	};

	const secondItem: Partial<Radar> = {
		id: 'id2',
		name: 'z',
		// tslint:disable-next-line: no-magic-numbers
		lastUpdatedDate: new Date(Date.now() + 100000),
	};

	const items: Array<Partial<Radar>> = [secondItem, firstItem];

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RadarSorterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('when sortByDate called', () => {
		describe('with isNewestToOldest true', () => {
			let result: Radar[];

			beforeEach(() => {
				result = service.sortByDate(items as any, true);
			});

			it('sort correctly', () => {
				expect(result[0]).toBe(secondItem as any);
			});
		});

		describe('with isNewestToOldest false', () => {
			let result: Radar[];

			beforeEach(() => {
				result = service.sortByDate(items as any, true);
			});

			it('sort correctly', () => {
				expect(result[0]).toBe(secondItem as any);
			});
		});
	});

	describe('when sortAlphabetical called', () => {
		describe('with isAtoZ true', () => {
			let result: Radar[];

			beforeEach(() => {
				result = service.sortAlphabetical(items as any, true);
			});

			it('sort correctly', () => {
				expect(result[0]).toBe(firstItem as any);
			});
		});

		describe('with isAtoZ false', () => {
			let result: Radar[];

			beforeEach(() => {
				result = service.sortAlphabetical(items as any, true);
			});

			it('sort correctly', () => {
				expect(result[0]).toBe(firstItem as any);
			});
		});
	});
});
