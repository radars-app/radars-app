import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { EntityStatus } from '../../model/entity-status';
import { containerFeatureKey } from '../store.module';
import { selectContainerState } from './container.selectors';
import { ContainerState } from './container.state';

describe('Container Selectors', () => {
	it('should select the feature state', () => {
		const result: ContainerState = selectContainerState({
			[containerFeatureKey]: {
				theme: ComponentTheme.Light,
				userProfile: {
					value: null,
					status: EntityStatus.Init,
				},
			},
		});

		expect(result).toEqual({
			theme: ComponentTheme.Light,
			userProfile: {
				value: null,
				status: EntityStatus.Init,
			},
		});
	});
});
