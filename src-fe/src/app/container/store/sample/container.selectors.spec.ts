import { ComponentTheme } from '../../../../shared/component-theme.enum';
import * as fromSample from './container.reducer';
import { selectContainerState } from './container.selectors';

describe('Sample Selectors', () => {
	it('should select the feature state', () => {
		const result: fromSample.ContainerState = selectContainerState({
			[fromSample.containerFeatureKey]: {
				theme: ComponentTheme.Light,
				userProfile: null,
				userPhoto: '../../../../assets/profile.svg',
			}
		});

		expect(result).toEqual({
			theme: ComponentTheme.Light,
			userProfile: null,
			userPhoto: '../../../../assets/profile.svg',
		});
	});
});
