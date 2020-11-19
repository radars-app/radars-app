import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { containerFeatureKey } from '../store.module';
import { selectContainerState } from './container.selectors';
import { ContainerState } from './container.state';

describe('Sample Selectors', () => {
	it('should select the feature state', () => {
		const result: ContainerState = selectContainerState({
			[containerFeatureKey]: {
				theme: ComponentTheme.Light,
				userProfile: null,
				userPhoto: '../../../../assets/profile.svg',
			},
		});

		expect(result).toEqual({
			theme: ComponentTheme.Light,
			userProfile: null,
			userPhoto: '../../../../assets/profile.svg',
		});
	});
});
