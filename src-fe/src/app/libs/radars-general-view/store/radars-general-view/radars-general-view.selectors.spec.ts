import { EntityStatus } from 'src/app/libs/container/model/entity-status';

import { radarsGeneralViewFeatureKey } from '../store.module';
import { selectRadarsGeneralViewState } from './radars-general-view.selectors';
import { RadarsGeneralViewState } from './radars-general-view.state';

describe('Radars-general-view selectors', () => {
	it('should select the feature state', () => {
		const result: RadarsGeneralViewState = selectRadarsGeneralViewState({
			[radarsGeneralViewFeatureKey]: {
				radarsWithData: {
					value: null,
					status: EntityStatus.Init,
				},
			},
		});

		expect(result).toEqual({
			radarsWithData: {
				value: null,
				status: EntityStatus.Init,
			},
		});
	});
});
