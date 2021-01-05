import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { radarsGeneralViewFeatureKey } from '../store.module';
import { RadarsGeneralViewState } from './radars-general-view.state';
import { RadarWithData } from '../../model/radar-with-data';

export const selectRadarsGeneralViewState: MemoizedSelector<{}, RadarsGeneralViewState> = createFeatureSelector<RadarsGeneralViewState>(
	radarsGeneralViewFeatureKey
);

export const selectRadarsWithData: MemoizedSelector<RadarsGeneralViewState, RadarWithData[]> = createSelector(
	selectRadarsGeneralViewState,
	(state: RadarsGeneralViewState) => state.radarsWithData.value
);
