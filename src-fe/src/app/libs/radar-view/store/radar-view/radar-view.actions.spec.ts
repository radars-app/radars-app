import * as RadarViewActions from './radar-view.actions';

describe('Sample', () => {
	it('should create an instance LoadUserPhoto', () => {
		expect(new RadarViewActions.LoadUserPhoto()).toBeTruthy();
	});

	it('should create an instance LoadSamplesFailure', () => {
		expect(new RadarViewActions.LoadUserPhotoSuccess('profile.svg')).toBeTruthy();
	});

	it('should create an instance LoadSamplesSuccess', () => {
		expect(new RadarViewActions.LoadUserProfile()).toBeTruthy();
	});
});
