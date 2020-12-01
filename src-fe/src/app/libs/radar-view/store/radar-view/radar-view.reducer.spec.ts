import { radarViewReducer, initialState } from './radar-view.reducer';
import { RadarViewState } from './radar-view.state';
import { LoadRadars } from './radar-view.actions';
import { EntityStatus } from 'src/app/libs/container/model/entity-status';

describe('RadarView Reducer', () => {
	describe('an unknown action', () => {
		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = radarViewReducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});

	describe('LoadRadars action', () => {
		it('should set radars state to pending', () => {
			const action: LoadRadars = new LoadRadars('1');

			const result: RadarViewState = radarViewReducer(initialState, action);

			expect(result.radars.status).toBe(EntityStatus.Pending);
		});
	});
});
