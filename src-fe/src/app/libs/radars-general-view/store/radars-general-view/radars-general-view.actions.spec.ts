import * as RadarViewActions from './radars-general-view.actions';

describe('RadarView', () => {
	it('should create an instance LoadRadars', () => {
		expect(new RadarViewActions.LoadRadarsWithData()).toBeTruthy();
	});

	it('should create an instance LoadRadarsSuccess', () => {
		expect(
			new RadarViewActions.LoadRadarsWithDataSuccess([
				{
					uid: '1',
					name: 'Radar',
					lastUpdatedAt: new Date('12/1/2020'),
					rings: [],
					sectors: [],
					items: [],
					linkColumn: '',
					consideredNewInDays: 2,
					contentColumn: '',
					nameColumn: '',
					sectorColumn: '',
					ringColumn: '',
					filterColumnEnabled: false,
					filterColumnKeywords: [],
					filterColumnName: '',
				},
			])
		).toBeTruthy();
	});
});
