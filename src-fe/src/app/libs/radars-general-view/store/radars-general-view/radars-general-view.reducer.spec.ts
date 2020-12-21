import { radarsGeneralViewReducer, initialRadarsGeneralViewState } from './radars-general-view.reducer';
import { RadarsGeneralViewState } from './radars-general-view.state';
import { LoadAllLatestRadars } from './radars-general-view.actions';
import { EntityStatus } from 'src/app/libs/container/model/entity-status';

describe('RadarsGeneralView Reducer', () => {
	describe('an unknown action', () => {
		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = radarsGeneralViewReducer(initialRadarsGeneralViewState, action);

			expect(result).toBe(initialRadarsGeneralViewState);
		});
	});

	describe('LoadAllLatestRadars action', () => {
		it('should set radars state to pending', () => {
			const action: LoadAllLatestRadars = new LoadAllLatestRadars();

			const result: RadarsGeneralViewState = radarsGeneralViewReducer(initialRadarsGeneralViewState, action);

			expect(result.radars.status).toBe(EntityStatus.Pending);
		});
	});
});
