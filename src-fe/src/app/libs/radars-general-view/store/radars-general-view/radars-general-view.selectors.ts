import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Radar } from 'src/app/libs/radar-view/model/radar';

import { radarsGeneralViewFeatureKey } from '../store.module';
import { RadarsGeneralViewState } from './radars-general-view.state';

export const selectRadarsGeneralViewState: MemoizedSelector<{}, RadarsGeneralViewState> = createFeatureSelector<RadarsGeneralViewState>(
	radarsGeneralViewFeatureKey
);

export const selectRadarsWithData: MemoizedSelector<RadarsGeneralViewState, Radar[]> = createSelector(
	selectRadarsGeneralViewState,
	(state: RadarsGeneralViewState) => state.radarsWithData.value
);
