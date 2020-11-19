import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ComponentTheme } from '../../../../shared/component-theme.enum';
import { containerFeatureKey, ContainerState } from './container.reducer';

export const selectContainerState: MemoizedSelector<{}, ContainerState> = createFeatureSelector<ContainerState>(containerFeatureKey);

export const selectUserPhotoURL: MemoizedSelector<ContainerState, string> = createSelector(
	selectContainerState,
	(state: ContainerState) => state.userPhoto
);

export const selectUserProfile: MemoizedSelector<ContainerState, string> = createSelector(
	selectContainerState,
	(state: ContainerState) => state.userProfile
);

export const selectTheme: MemoizedSelector<ContainerState, ComponentTheme> = createSelector(
	selectContainerState,
	(state: ContainerState) => state.theme
);
