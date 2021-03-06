import { EntityStatus } from 'src/app/libs/container/model/entity-status';

import { radarViewFeatureKey } from '../store.module';
import { selectRadarViewState } from './radar-view.selectors';
import { RadarViewState } from './radar-view.state';

describe('Radar-view Selectors', () => {
	it('should select the feature state', () => {
		const result: RadarViewState = selectRadarViewState({
			[radarViewFeatureKey]: {
				radar: {
					value: null,
					status: EntityStatus.Init,
				},
				searchQuery: null,
				filteredRadarDataItems: null,
			},
		});

		expect(result).toEqual({
			radar: {
				value: null,
				status: EntityStatus.Init,
			},
			searchQuery: null,
			filteredRadarDataItems: null,
		});
	});
});
