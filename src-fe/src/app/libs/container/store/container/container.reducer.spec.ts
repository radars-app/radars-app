// import {
// 	reducer,
// 	initialState,
// 	ContainerState,
// } from './container.reducer';
// import {
// 	ContainerActionTypes,
// 	LoadSamples,
// 	LoadSamplesFailure,
// 	LoadSamplesSuccess,
// } from './container.actions';

// describe('Sample Reducer', () => {

// 	describe('an unknown action', () => {

// 		it('should return the previous state', () => {
// 			const action: any = {} as any;

// 			const result: any = reducer(initialState, action);

// 			expect(result).toBe(initialState);
// 		});
// 	});

// 	describe('LoadSamples action', () => {

// 		it('should return the previous state', () => {
// 			const action: LoadSamples = {
// 				type: ContainerActionTypes.LoadSamples,
// 			} as LoadSamples;

// 			const result: ContainerState = reducer(initialState, action);

// 			expect(result).toBe(initialState);
// 		});
// 	});

// 	describe('LoadSamplesFailure action', () => {

// 		it('should return the previous state', () => {
// 			const action: LoadSamplesFailure = {
// 				type: ContainerActionTypes.LoadSamplesFailure,
// 			} as LoadSamplesFailure;

// 			const result: ContainerState = reducer(initialState, action);

// 			expect(result).toBe(initialState);
// 		});
// 	});

// 	describe('LoadSamplesSuccess action', () => {

// 		it('should return the previous state', () => {
// 			const action: LoadSamplesSuccess = {
// 				type: ContainerActionTypes.LoadSamplesSuccess,
// 			} as LoadSamplesSuccess;

// 			const result: ContainerState = reducer(initialState, action);

// 			expect(result).toBe(initialState);
// 		});
// 	});
// });
