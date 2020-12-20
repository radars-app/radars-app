import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { radarsGeneralViewFeatureKey } from '../store.module';
import { RadarsGeneralViewState } from './radars-general-view.state';
import { Radar } from '../../../radar-view/model/radar';

export const selectRadarsGeneralViewState: MemoizedSelector<{}, RadarsGeneralViewState> = createFeatureSelector<RadarsGeneralViewState>(
	radarsGeneralViewFeatureKey
);

export const selectRadars: MemoizedSelector<RadarsGeneralViewState, Radar[]> = createSelector(
	selectRadarsGeneralViewState,
	(state: RadarsGeneralViewState) => state.radars.value
);
