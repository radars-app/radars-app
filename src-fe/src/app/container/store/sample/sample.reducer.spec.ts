import {
	reducer,
	initialState,
	State,
} from './sample.reducer';
import {
	SampleActionTypes,
	LoadSamples,
	LoadSamplesFailure,
	LoadSamplesSuccess,
} from './sample.actions';

describe('Sample Reducer', () => {

	describe('an unknown action', () => {

		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});

	describe('LoadSamples action', () => {

		it('should return the previous state', () => {
			const action: LoadSamples = {
				type: SampleActionTypes.LoadSamples,
			} as LoadSamples;

			const result: State = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});

	describe('LoadSamplesFailure action', () => {

		it('should return the previous state', () => {
			const action: LoadSamplesFailure = {
				type: SampleActionTypes.LoadSamplesFailure,
			} as LoadSamplesFailure;

			const result: State = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});

	describe('LoadSamplesSuccess action', () => {

		it('should return the previous state', () => {
			const action: LoadSamplesSuccess = {
				type: SampleActionTypes.LoadSamplesSuccess,
			} as LoadSamplesSuccess;

			const result: State = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
