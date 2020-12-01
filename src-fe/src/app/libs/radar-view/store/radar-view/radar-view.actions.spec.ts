import * as RadarViewActions from './radar-view.actions';

describe('Sample', () => {
	it('should create an instance LoadUserPhoto', () => {
		expect(new RadarViewActions.LoadRadars('1')).toBeTruthy();
	});

	it('should create an instance LoadSamplesFailure', () => {
		expect(
			new RadarViewActions.LoadRadarsSuccess([
				{
					id: '1',
					name: 'Radar',
					lastUpdatedDate: '12/1/2020',
					config: {
						name: 'RADAR',
						csv: 'csv',
					},
				},
			])
		).toBeTruthy();
	});
});
