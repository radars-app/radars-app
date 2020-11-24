import { containerReducer, initialState } from './container.reducer';
import { ContainerActionTypes, SetTheme } from './container.actions';
import { ContainerState } from './container.state';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';

describe('Container Reducer', () => {
	describe('an unknown action', () => {
		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = containerReducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});

	describe('SetTheme action', () => {
		it('should return the previous state', () => {
			const action: SetTheme = new SetTheme(ComponentTheme.Dark);

			const result: ContainerState = containerReducer(initialState, action);

			expect(result.theme).toBe(ComponentTheme.Dark);
		});
	});
});
