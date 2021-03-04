import { Radar } from '../../model/radar';
import * as RadarViewActions from './radar-view.actions';

describe('RadarView', () => {
	it('should create an instance LoadRadar', () => {
		expect(new RadarViewActions.LoadRadar('1')).toBeTruthy();
	});

	it('should create an instance LoadRadarSuccess', () => {
		expect(
			new RadarViewActions.LoadRadarSuccess({
				uid: '1',
				name: 'Radar',
				lastUpdatedAt: new Date('12/1/2020'),
				rings: [],
				sectors: [],
			} as Radar)
		).toBeTruthy();
	});
});
