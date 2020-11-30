import { EntityStatus } from 'src/app/libs/container/model/entity-status';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';

import { radarViewFeatureKey } from '../store.module';
import { selectRadarViewState } from './radar-view.selectors';
import { RadarViewState } from './radar-view.state';

describe('Radar-view Selectors', () => {
	it('should select the feature state', () => {
		const result: RadarViewState = selectRadarViewState({
			[radarViewFeatureKey]: {
				radarConfig: {
					value: null,
					status: EntityStatus.Init,
				},
			},
		});

		expect(result).toEqual({
			radarConfig: {
				value: null,
				status: EntityStatus.Init,
			},
		});
	});
});
