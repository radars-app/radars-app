import * as SampleActions from './sample.actions';

describe('Sample', () => {

	it('should create an instance LoadSamples', () => {
		expect(new SampleActions.LoadSamples()).toBeTruthy();
	});

	it('should create an instance LoadSamplesFailure', () => {
		expect(new SampleActions.LoadSamplesFailure({error: null})).toBeTruthy();
	});

	it('should create an instance LoadSamplesSuccess', () => {
		expect(new SampleActions.LoadSamplesSuccess({data: null})).toBeTruthy();
	});
});
