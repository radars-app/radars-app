import * as ContainerActions from './container.actions';

describe('Sample', () => {
	it('should create an instance LoadUserPhoto', () => {
		expect(new ContainerActions.LoadUserPhoto()).toBeTruthy();
	});

	it('should create an instance LoadSamplesFailure', () => {
		expect(new ContainerActions.LoadUserPhotoSuccess('profile.svg')).toBeTruthy();
	});

	it('should create an instance LoadSamplesSuccess', () => {
		expect(new ContainerActions.LoadUserProfile()).toBeTruthy();
	});
});
