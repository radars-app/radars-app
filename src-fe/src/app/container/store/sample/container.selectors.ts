import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { ComponentTheme } from '../../../../shared/component-theme.enum';
import * as fromSample from './container.reducer';

export const selectContainerState: MemoizedSelector<{}, fromSample.ContainerState> = createFeatureSelector<fromSample.ContainerState>(
	fromSample.containerFeatureKey
);

export const selectUserPhotoURL: MemoizedSelector<fromSample.ContainerState, string> = createSelector(
	selectContainerState,
	(state: fromSample.ContainerState) => state.userPhoto,
);

export const selectUserProfile: MemoizedSelector<fromSample.ContainerState, string> = createSelector(
	selectContainerState,
	(state: fromSample.ContainerState) => state.userProfile,
);

export const selectTheme: MemoizedSelector<fromSample.ContainerState, ComponentTheme> = createSelector(
	selectContainerState,
	(state: fromSample.ContainerState) => state.theme,
);
