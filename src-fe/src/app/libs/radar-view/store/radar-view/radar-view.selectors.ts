import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { radarViewFeatureKey } from '../store.module';
import { RadarViewState } from './radar-view.state';
import { RadarEntity } from '../../model/radar-entity.model';

export const selectRadarViewState: MemoizedSelector<{}, RadarViewState> = createFeatureSelector<RadarViewState>(radarViewFeatureKey);

export const selectActiveRadars: MemoizedSelector<RadarViewState, RadarEntity[]> = createSelector(
	selectRadarViewState,
	(state: RadarViewState) => state.radars.value
);
