import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { radarViewFeatureKey } from '../store.module';
import { RadarViewState } from './radar-view.state';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';

export const selectRadarViewState: MemoizedSelector<{}, RadarViewState> = createFeatureSelector<RadarViewState>(radarViewFeatureKey);

export const selectRadars: MemoizedSelector<RadarViewState, Radar[]> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.radars.value
);

export const selectRadarDataItems: MemoizedSelector<RadarViewState, RadarDataItem[]> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.radarDataItems.value
);

export const selectSearchQuery: MemoizedSelector<RadarViewState, string> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.searchQuery
);

export const selectFilteredRadarDataItems: MemoizedSelector<RadarViewState, RadarDataItem[]> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.filteredRadarDataItems
);
