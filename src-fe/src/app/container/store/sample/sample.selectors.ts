import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import * as fromSample from './sample.reducer';

export const selectSampleState: MemoizedSelector<{}, fromSample.ContainerState> = createFeatureSelector<fromSample.ContainerState>(
	fromSample.sampleFeatureKey
);

export const selectUserPhotoURL: MemoizedSelector<fromSample.ContainerState, string> = createSelector(
	selectSampleState,
	(state: fromSample.ContainerState) => state.userPhoto,
);

export const selectUserProfile: MemoizedSelector<fromSample.ContainerState, string> = createSelector(
	selectSampleState,
	(state: fromSample.ContainerState) => state.userProfile,
);

export const selectTheme: MemoizedSelector<fromSample.ContainerState, string> = createSelector(
	selectSampleState,
	(state: fromSample.ContainerState) => state.theme,
);
