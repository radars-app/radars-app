import { radarViewReducer, initialState } from './radar-view.reducer';
import { RadarViewState } from './radar-view.state';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';

describe('RadarView Reducer', () => {
	describe('an unknown action', () => {
		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = radarViewReducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});

	describe('SetTheme action', () => {
		it('should return the previous state', () => {
			const action: SetTheme = new SetTheme(ComponentTheme.Dark);

			const result: RadarViewState = radarViewReducer(initialState, action);

			expect(result.theme).toBe(ComponentTheme.Dark);
		});
	});
});
