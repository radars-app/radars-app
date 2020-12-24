import * as RadarViewActions from './radars-general-view.actions';

describe('RadarView', () => {
	it('should create an instance LoadRadars', () => {
		expect(new RadarViewActions.LoadAllLatestRadars()).toBeTruthy();
	});

	it('should create an instance LoadRadarsSuccess', () => {
		expect(
			new RadarViewActions.LoadAllLatestRadarsSuccess([
				{
					id: '1',
					name: 'Radar',
					lastUpdatedDate: new Date('12/1/2020'),
					rings: [],
					sectors: [],
					config: {
						name: 'RADAR',
						csv: 'csv',
						rings: [],
						sectors: [],
					},
				},
			])
		).toBeTruthy();
	});
});
