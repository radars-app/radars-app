import * as ContainerActions from './container.actions';

describe('Container Actions', () => {
	it('should create an instance LoadSamplesSuccess', () => {
		expect(new ContainerActions.LoadUserProfile()).toBeTruthy();
	});
});
