import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { radarViewFeatureKey } from '../store.module';
import { RadarViewState } from './radar-view.state';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';
import { EntityStatus } from 'src/app/libs/container/model/entity-status';

export const selectRadarViewState: MemoizedSelector<{}, RadarViewState> = createFeatureSelector<RadarViewState>(radarViewFeatureKey);

export const selectRadar: MemoizedSelector<RadarViewState, Radar> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.radar.value
);

export const selectRadarStatus: MemoizedSelector<RadarViewState, EntityStatus> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.radar.status
);

export const selectSearchQuery: MemoizedSelector<RadarViewState, string> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.searchQuery
);

export const selectFilteredRadarDataItems: MemoizedSelector<RadarViewState, RadarDataItem[]> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.filteredRadarDataItems
);
