import { radarsGeneralViewReducer, initialState } from './radars-general-view.reducer';
import { RadarsGeneralViewState } from './radars-general-view.state';
import { LoadRadarsWithData } from './radars-general-view.actions';
import { EntityStatus } from 'src/app/libs/container/model/entity-status';

describe('RadarsGeneralView Reducer', () => {
	describe('an unknown action', () => {
		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = radarsGeneralViewReducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});

	describe('LoadAllLatestRadars action', () => {
		it('should set radars state to pending', () => {
			const action: LoadRadarsWithData = new LoadRadarsWithData();

			const result: RadarsGeneralViewState = radarsGeneralViewReducer(initialState, action);

			expect(result.radarsWithData.status).toBe(EntityStatus.Pending);
		});
	});
});
